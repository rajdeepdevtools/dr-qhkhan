import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { Patient } from '../models/Patient';
import { DoctorProfile } from '../models/DoctorProfile';
import { AuditService } from '../services/auditService';
import { AuthRequest } from '../middleware/auth';

export class AppointmentController {
  static async createAppointment(req: Request, res: Response): Promise<void> {
    const { name, email, phone, age, gender, department, doctor, preferredDate, preferredTime, message, consent, medicalDocuments, paymentScreenshot } = req.body;

    const dateStr = preferredDate.replace(/-/g, '');
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const appointmentId = `HOSP-APT-${dateStr}-${randNum}`;

    let doctorName: string | undefined;
    if (doctor) {
      const docObj = await DoctorProfile.findById(doctor);
      if (docObj) doctorName = docObj.name;
    }

    let patientRef: any = null;
    const existingPatient = await Patient.findOne({ $or: [{ email }, { phone }] });
    if (existingPatient) {
      patientRef = existingPatient._id;
    }

    const appointment = await Appointment.create({
      appointmentId,
      name,
      email,
      phone,
      age,
      gender,
      department,
      doctor: doctor || undefined,
      doctorName,
      preferredDate,
      preferredTime,
      message,
      consent,
      medicalDocuments: medicalDocuments || [],
      paymentScreenshot,
      status: 'pending',
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
    if (doctor) {
      const docObj = await DoctorProfile.findById(doctor);
      if (docObj) {
        appointment.doctor = docObj._id as any;
        appointment.doctorName = docObj.name;
      }
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
    const { name, email, phone, age, gender, department, doctor, preferredDate, preferredTime, status, message } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    appointment.name = name ?? appointment.name;
    appointment.email = email ?? appointment.email;
    appointment.phone = phone ?? appointment.phone;
    appointment.age = age ?? appointment.age;
    appointment.gender = gender ?? appointment.gender;
    appointment.department = department ?? appointment.department;
    appointment.preferredDate = preferredDate ?? appointment.preferredDate;
    appointment.preferredTime = preferredTime ?? appointment.preferredTime;
    appointment.status = status ?? appointment.status;
    appointment.message = message !== undefined ? message : appointment.message;

    if (doctor) {
      const docObj = await DoctorProfile.findById(doctor);
      if (docObj) {
        appointment.doctor = docObj._id as any;
        appointment.doctorName = docObj.name;
      }
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
    const appointment = await Appointment.findByIdAndDelete(id);
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
