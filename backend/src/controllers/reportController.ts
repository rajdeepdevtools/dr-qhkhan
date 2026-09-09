import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Report } from '../models/Report';
import { Patient } from '../models/Patient';
import { DoctorProfile } from '../models/DoctorProfile';
import { AuditService } from '../services/auditService';

export class ReportController {
  static async createReport(req: AuthRequest, res: Response): Promise<void> {
    const { patient, doctor, dateOfVisit, symptoms, diagnosis, vitals, prescription, doctorNotes, status } = req.body;

    const patientObj = await Patient.findById(patient);
    if (!patientObj) {
      res.status(404).json({ success: false, message: 'Patient not found' });
      return;
    }

    const doctorObj = await DoctorProfile.findById(doctor);
    if (!doctorObj) {
      res.status(404).json({ success: false, message: 'Doctor profile not found' });
      return;
    }

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const reportId = `HOSP-REP-${dateStr}-${randNum}`;

    const report = await Report.create({
      reportId,
      patient: patientObj._id,
      patientName: patientObj.name,
      doctor: doctorObj._id,
      doctorName: doctorObj.name,
      dateOfVisit,
      symptoms,
      diagnosis,
      vitals,
      prescription,
      doctorNotes,
      status: status || 'draft',
      finalizedAt: status === 'finalized' ? new Date() : undefined,
    });

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: status === 'finalized' ? 'FINALIZE_REPORT' : 'CREATE_DRAFT_REPORT',
      resourceType: 'Report',
      resourceId: report.reportId,
      ipAddress: req.ip,
    });

    res.status(201).json({ success: true, message: 'Report created', data: report });
  }

  static async updateReport(req: AuthRequest, res: Response): Promise<void> {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ success: false, message: 'Report not found' });
      return;
    }

    // Protection rule: finalized reports cannot be overwritten without amendment logging
    if (report.status === 'finalized' && req.user!.role !== 'admin' && req.user!.role !== 'super_admin') {
      res.status(403).json({
        success: false,
        message: 'Finalized medical reports cannot be modified directly.',
        code: 'REPORT_FINALIZED',
      });
      return;
    }

    const { symptoms, diagnosis, vitals, prescription, doctorNotes, status, amendmentReason } = req.body;

    if (report.status === 'finalized' && amendmentReason) {
      report.amendments.push({
        amendedBy: req.user!.email,
        amendedAt: new Date(),
        reason: amendmentReason,
        previousDiagnosis: report.diagnosis,
      });
    }

    report.symptoms = symptoms || report.symptoms;
    report.diagnosis = diagnosis || report.diagnosis;
    report.vitals = vitals || report.vitals;
    report.prescription = prescription || report.prescription;
    report.doctorNotes = doctorNotes !== undefined ? doctorNotes : report.doctorNotes;

    if (status === 'finalized' && report.status !== 'finalized') {
      report.status = 'finalized';
      report.finalizedAt = new Date();
    }

    await report.save();

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'UPDATE_REPORT',
      resourceType: 'Report',
      resourceId: report.reportId,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Report updated', data: report });
  }

  static async getReportById(req: AuthRequest, res: Response): Promise<void> {
    const report = await Report.findById(req.params.id)
      .populate('patient')
      .populate('doctor', 'name specialization degrees registrationNumber designation');

    if (!report) {
      res.status(404).json({ success: false, message: 'Report not found' });
      return;
    }

    res.status(200).json({ success: true, data: report });
  }

  static async getMyReports(req: AuthRequest, res: Response): Promise<void> {
    try {
      let query = {};
      
      if (req.user!.role === 'doctor') {
        const doctorProfile = await DoctorProfile.findOne({ user: req.user!.userId });
        if (doctorProfile) {
          query = { doctor: doctorProfile._id };
        } else {
          query = { doctor: null };
        }
      }
      
      const reports = await Report.find(query)
        .populate('patient', 'name patientId email phone')
        .sort({ createdAt: -1 });
        
      res.status(200).json({ success: true, data: reports });
    } catch (error: any) {
      res.status(550).json({ success: false, message: error.message });
    }
  }

  static async getAllReportsAdmin(req: AuthRequest, res: Response): Promise<void> {
    const reports = await Report.find()
      .populate('patient', 'name patientId email phone')
      .populate('doctor', 'name specialization')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reports });
  }

  static async deleteReport(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const report = await Report.findByIdAndDelete(id);
    if (!report) {
      res.status(404).json({ success: false, message: 'Report not found' });
      return;
    }

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_DELETE_REPORT',
      resourceType: 'Report',
      resourceId: report.reportId,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Report deleted successfully' });
  }
}
