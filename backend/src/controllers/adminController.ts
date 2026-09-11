import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Patient } from '../models/Patient';
import { DoctorProfile } from '../models/DoctorProfile';
import { ReceptionistProfile } from '../models/ReceptionistProfile';
import { Appointment } from '../models/Appointment';
import { Report } from '../models/Report';
import { AuditLog } from '../models/AuditLog';
import { User } from '../models/User';
import { AuthService } from '../services/authService';
import { AuditService } from '../services/auditService';

export class AdminController {
  static async getDashboardMetrics(req: AuthRequest, res: Response): Promise<void> {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await DoctorProfile.countDocuments({ isActive: true });
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    const confirmedAppointments = await Appointment.countDocuments({ status: 'confirmed' });
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    const totalReports = await Report.countDocuments();

    const recentActivity = await AuditLog.find().sort({ timestamp: -1 }).limit(10);

    res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalPatients,
          totalDoctors,
          totalAppointments,
          pendingAppointments,
          confirmedAppointments,
          completedAppointments,
          totalReports,
        },
        recentActivity,
      },
    });
  }

  static async getPatients(req: AuthRequest, res: Response): Promise<void> {
    const { search } = req.query;
    let query: any = {};

    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      query = {
        $or: [{ name: searchRegex }, { patientId: searchRegex }, { phone: searchRegex }, { email: searchRegex }],
      };
    }

    if (req.user!.role === 'doctor') {
      const doctorProfile = await DoctorProfile.findOne({ user: req.user!.userId });
      if (doctorProfile) {
        const patientIds = await Appointment.distinct('patient', { doctor: doctorProfile._id });
        query = {
          $and: [
            query,
            { $or: [{ _id: { $in: patientIds } }, { primaryDoctor: doctorProfile._id }] }
          ]
        };
      }
    }

    const patients = await Patient.find(query).populate('primaryDoctor', 'name specialization').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: patients });
  }

  static async createPatient(req: AuthRequest, res: Response): Promise<void> {
    const { name, email, phone, age, gender, bloodGroup, address, primaryDoctor } = req.body;

    const patientId = `HOSP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const patient = await Patient.create({
      patientId,
      name,
      email,
      phone,
      age,
      gender,
      bloodGroup,
      address,
      primaryDoctor: primaryDoctor || undefined,
    });

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_CREATE_PATIENT',
      resourceType: 'Patient',
      resourceId: patient.patientId,
      ipAddress: req.ip,
    });

    res.status(201).json({ success: true, message: 'Patient created successfully', data: patient });
  }

  static async updatePatient(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email, phone, age, gender, bloodGroup, address, primaryDoctor } = req.body;

    const patient = await Patient.findById(id);
    if (!patient) {
      res.status(404).json({ success: false, message: 'Patient record not found' });
      return;
    }

    patient.name = name ?? patient.name;
    patient.email = email ?? patient.email;
    patient.phone = phone ?? patient.phone;
    patient.age = age ?? patient.age;
    patient.gender = gender ?? patient.gender;
    patient.bloodGroup = bloodGroup !== undefined ? bloodGroup : patient.bloodGroup;
    patient.address = address !== undefined ? address : patient.address;
    patient.primaryDoctor = primaryDoctor ? primaryDoctor : undefined;

    await patient.save();

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_UPDATE_PATIENT',
      resourceType: 'Patient',
      resourceId: patient.patientId,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Patient record updated', data: patient });
  }

  static async deletePatient(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) {
      res.status(404).json({ success: false, message: 'Patient record not found' });
      return;
    }

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_DELETE_PATIENT',
      resourceType: 'Patient',
      resourceId: patient.patientId,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Patient record deleted successfully' });
  }

  static async createDoctor(req: AuthRequest, res: Response): Promise<void> {
    const { name, email, password, degrees, registrationNumber, specialization, designation, bio, clinicSchedule } = req.body;

    let userObj: any = null;
    if (email && password) {
      const hashedPassword = await AuthService.hashPassword(password);
      userObj = await User.create({ email, password: hashedPassword, role: 'doctor' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const doctor = await DoctorProfile.create({
      slug,
      name,
      degrees,
      registrationNumber,
      specialization,
      designation,
      bio,
      clinicSchedule,
      user: userObj ? userObj._id : undefined,
    });

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_CREATE_DOCTOR',
      resourceType: 'DoctorProfile',
      resourceId: doctor.slug,
      ipAddress: req.ip,
    });

    res.status(201).json({ success: true, message: 'Doctor created successfully', data: doctor });
  }

  static async updateDoctor(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email, password, degrees, registrationNumber, specialization, designation, bio, clinicSchedule, isActive } = req.body;

    const doctor = await DoctorProfile.findById(id);
    if (!doctor) {
      res.status(404).json({ success: false, message: 'Doctor profile not found' });
      return;
    }

    if (name) {
      doctor.name = name;
      doctor.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    doctor.degrees = degrees ?? doctor.degrees;
    doctor.registrationNumber = registrationNumber !== undefined ? registrationNumber : doctor.registrationNumber;
    doctor.specialization = specialization ?? doctor.specialization;
    doctor.designation = designation ?? doctor.designation;
    doctor.bio = bio ?? doctor.bio;
    doctor.clinicSchedule = clinicSchedule ?? doctor.clinicSchedule;
    if (typeof isActive === 'boolean') doctor.isActive = isActive;

    if (email || password) {
      if (doctor.user) {
        const user = await User.findById(doctor.user);
        if (user) {
          if (email) user.email = email;
          if (password) user.password = await AuthService.hashPassword(password);
          await user.save();
        }
      } else if (email && password) {
        const hashedPassword = await AuthService.hashPassword(password);
        const userObj = await User.create({ email, password: hashedPassword, role: 'doctor' });
        doctor.user = userObj._id as any;
      }
    }

    await doctor.save();

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_UPDATE_DOCTOR',
      resourceType: 'DoctorProfile',
      resourceId: doctor.slug,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Doctor profile updated', data: doctor });
  }

  static async deleteDoctor(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const doctor = await DoctorProfile.findByIdAndDelete(id);
    if (!doctor) {
      res.status(404).json({ success: false, message: 'Doctor profile not found' });
      return;
    }

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_DELETE_DOCTOR',
      resourceType: 'DoctorProfile',
      resourceId: doctor.slug,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Doctor profile deleted successfully' });
  }

  static async getAppointments(req: AuthRequest, res: Response): Promise<void> {
    const { status, doctor, date } = req.query;
    let query: any = {};

    if (status) query.status = status;
    if (doctor) query.doctor = doctor;
    if (date) query.preferredDate = date;

    if (req.user!.role === 'doctor') {
      const doctorProfile = await DoctorProfile.findOne({ user: req.user!.userId });
      if (doctorProfile) {
        query.doctor = doctorProfile._id;
      }
    }

    const appointments = await Appointment.find(query)
      .populate('doctor', 'name specialization')
      .populate('patient')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: appointments });
  }

  static async getAuditLogs(req: AuthRequest, res: Response): Promise<void> {
    const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(100);
    res.status(200).json({ success: true, data: logs });
  }
}
