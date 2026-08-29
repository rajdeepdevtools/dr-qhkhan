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

  static async getAppointments(req: AuthRequest, res: Response): Promise<void> {
    const { status, doctor, date } = req.query;
    let query: any = {};

    if (status) query.status = status;
    if (doctor) query.doctor = doctor;
    if (date) query.preferredDate = date;

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
