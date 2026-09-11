import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Appointment } from '../models/Appointment';
import { Patient } from '../models/Patient';
import { DoctorProfile } from '../models/DoctorProfile';
import { AuditService } from '../services/auditService';
import { AuthRequest } from '../middleware/auth';

export class AppointmentController {
  static async createAppointment(req: Request, res: Response): Promise<void> {
    const { name, email, phone, age, gender, bloodGroup, address, department, doctor, preferredDate, preferredTime, message, consent, medicalDocuments, paymentScreenshot } = req.body;

    const dateStr = (preferredDate || new Date().toISOString().slice(0, 10)).replace(/-/g, '');
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const appointmentId = `HOSP-APT-${dateStr}-${randNum}`;

    let doctorName: string | undefined;
    let doctorId: any = undefined;
    if (doctor && mongoose.isValidObjectId(doctor)) {
      const docObj = await DoctorProfile.findById(doctor);
      if (docObj) {
        doctorName = docObj.name;
        doctorId = docObj._id;
      }
    }

    let patientRef: any = null;
    const queryParts = [];
    if (email && email.trim() !== '') queryParts.push({ email });
    if (phone && phone.trim() !== '') queryParts.push({ phone });
    
    let existingPatient = null;
    if (queryParts.length > 0) {
      existingPatient = await Patient.findOne({ $or: queryParts });
    }

    if (existingPatient) {
      patientRef = existingPatient._id;
      let updated = false;
      if (bloodGroup && !existingPatient.bloodGroup) { existingPatient.bloodGroup = bloodGroup; updated = true; }
      if (address && !existingPatient.address) { existingPatient.address = address; updated = true; }
      if (doctorId && !existingPatient.primaryDoctor) { existingPatient.primaryDoctor = doctorId; updated = true; }
      if (updated) await existingPatient.save();
    } else {
      // Auto-create patient immediately so doctor can see them
      const newPatientId = `HOSP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newPatient = await Patient.create({
        patientId: newPatientId,
        name,
        email: email || `no-email-${Date.now()}@clinic.com`,
        phone,
        age: Number(age) || 30,
        gender,
        bloodGroup: bloodGroup || undefined,
        address: address || undefined,
        primaryDoctor: doctorId || undefined,
      });
      patientRef = newPatient._id;
    }

    const appointment = await Appointment.create({
      appointmentId,
      name,
      email,
      phone,
      age: Number(age) || 30,
      gender,
      bloodGroup,
      address,
      department,
      doctor: doctorId,
      doctorName,
      preferredDate,
      preferredTime,
      message,
      consent: consent !== undefined ? consent : true,
      medicalDocuments: medicalDocuments || [],
      paymentScreenshot,
      status: req.body.status || 'pending',
      patient: patientRef || undefined,
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booking submitted successfully',
      data: appointment,
    });
  }

  static async getAppointmentById(req: AuthRequest, res: Response): Promise<void> {
    const appointment = await Appointment.findOne({
      $or: [{ appointmentId: req.params.id }, { _id: req.params.id }],
    }).populate('doctor', 'name specialization degrees');

    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    res.status(200).json({ success: true, data: appointment });
  }

  static async updateAppointmentStatus(req: AuthRequest, res: Response): Promise<void> {
    const { status, doctor } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    appointment.status = status || appointment.status;
    if (doctor && mongoose.isValidObjectId(doctor)) {
      const docObj = await DoctorProfile.findById(doctor);
      if (docObj) {
        appointment.doctor = docObj._id as any;
        appointment.doctorName = docObj.name;
      }
    }

    // Auto-create and link patient when confirmed
    if (status === 'confirmed' || status === 'completed') {
      const queryParts = [];
      if (appointment.email && appointment.email.trim() !== '') queryParts.push({ email: appointment.email });
      if (appointment.phone && appointment.phone.trim() !== '') queryParts.push({ phone: appointment.phone });
      
      let patient = null;
      if (queryParts.length > 0) {
        patient = await Patient.findOne({ $or: queryParts });
      }
      
      if (!patient) {
        const patientId = `HOSP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        patient = await Patient.create({
          patientId,
          name: appointment.name,
          email: appointment.email || `no-email-${Date.now()}@clinic.com`,
          phone: appointment.phone,
          age: appointment.age,
          gender: appointment.gender,
          primaryDoctor: appointment.doctor,
        });
      } else if (appointment.doctor && !patient.primaryDoctor) {
        patient.primaryDoctor = appointment.doctor;
        await patient.save();
      }
      
      appointment.patient = patient._id as any;
    }

    await appointment.save();

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'UPDATE_APPOINTMENT_STATUS',
      resourceType: 'Appointment',
      resourceId: appointment.appointmentId,
      details: `Status set to ${appointment.status}`,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Appointment updated', data: appointment });
  }

  static async updateAppointment(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email, phone, age, gender, bloodGroup, address, department, doctor, preferredDate, preferredTime, status, message } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    appointment.name = name ?? appointment.name;
    appointment.email = email ?? appointment.email;
    appointment.phone = phone ?? appointment.phone;
    appointment.age = age !== undefined ? Number(age) : appointment.age;
    appointment.gender = gender ?? appointment.gender;
    appointment.bloodGroup = bloodGroup ?? appointment.bloodGroup;
    appointment.address = address ?? appointment.address;
    appointment.department = department ?? appointment.department;
    appointment.preferredDate = preferredDate ?? appointment.preferredDate;
    appointment.preferredTime = preferredTime ?? appointment.preferredTime;
    appointment.status = status ?? appointment.status;
    appointment.message = message !== undefined ? message : appointment.message;

    if (doctor && mongoose.isValidObjectId(doctor)) {
      const docObj = await DoctorProfile.findById(doctor);
      if (docObj) {
        appointment.doctor = docObj._id as any;
        appointment.doctorName = docObj.name;
      }
    } else if (doctor === '' || doctor === null) {
      appointment.doctor = undefined;
      appointment.doctorName = undefined;
    }

    // Auto-create and link patient when confirmed
    if (appointment.status === 'confirmed' || appointment.status === 'completed') {
      const queryParts = [];
      if (appointment.email && appointment.email.trim() !== '') queryParts.push({ email: appointment.email });
      if (appointment.phone && appointment.phone.trim() !== '') queryParts.push({ phone: appointment.phone });
      
      let patient = null;
      if (queryParts.length > 0) {
        patient = await Patient.findOne({ $or: queryParts });
      }
      
      if (!patient) {
        const patientId = `HOSP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        patient = await Patient.create({
          patientId,
          name: appointment.name,
          email: appointment.email || `no-email-${Date.now()}@clinic.com`,
          phone: appointment.phone,
          age: appointment.age,
          gender: appointment.gender,
          primaryDoctor: appointment.doctor,
        });
      } else if (appointment.doctor && !patient.primaryDoctor) {
        patient.primaryDoctor = appointment.doctor;
        await patient.save();
      }
      
      appointment.patient = patient._id as any;
    }

    await appointment.save();

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_UPDATE_APPOINTMENT',
      resourceType: 'Appointment',
      resourceId: appointment.appointmentId,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Appointment updated successfully', data: appointment });
  }

  static async deleteAppointment(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const filter = mongoose.isValidObjectId(id)
      ? { $or: [{ _id: id }, { appointmentId: id }] }
      : { appointmentId: id };

    const appointment = await Appointment.findOneAndDelete(filter);
    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_DELETE_APPOINTMENT',
      resourceType: 'Appointment',
      resourceId: appointment.appointmentId,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  }
}

