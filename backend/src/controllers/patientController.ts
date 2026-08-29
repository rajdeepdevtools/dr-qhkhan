import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Patient } from '../models/Patient';
import { Appointment } from '../models/Appointment';
import { Report } from '../models/Report';

export class PatientController {
  static async getMyProfile(req: AuthRequest, res: Response): Promise<void> {
    const patient = await Patient.findOne({ registeredUser: req.user!.userId }).populate(
      'primaryDoctor',
      'name specialization photoUrl'
    );

    if (!patient) {
      res.status(404).json({ success: false, message: 'Patient profile not found' });
      return;
    }

    res.status(200).json({ success: true, data: patient });
  }

  static async getMyAppointments(req: AuthRequest, res: Response): Promise<void> {
    const patient = await Patient.findOne({ registeredUser: req.user!.userId });
    if (!patient) {
      res.status(404).json({ success: false, message: 'Patient profile not found' });
      return;
    }

    const appointments = await Appointment.find({ patient: patient._id })
      .populate('doctor', 'name specialization degrees')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: appointments });
  }

  static async getMyReports(req: AuthRequest, res: Response): Promise<void> {
    const patient = await Patient.findOne({ registeredUser: req.user!.userId });
    if (!patient) {
      res.status(404).json({ success: false, message: 'Patient profile not found' });
      return;
    }

    const reports = await Report.find({ patient: patient._id, status: 'finalized' })
      .populate('doctor', 'name specialization degrees registrationNumber')
      .sort({ dateOfVisit: -1 });

    res.status(200).json({ success: true, data: reports });
  }
}
