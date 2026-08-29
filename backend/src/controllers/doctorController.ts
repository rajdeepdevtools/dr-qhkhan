import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { DoctorProfile } from '../models/DoctorProfile';
import { Appointment } from '../models/Appointment';
import { Patient } from '../models/Patient';
import { Report } from '../models/Report';

export class DoctorController {
  static async getAllDoctors(req: Request, res: Response): Promise<void> {
    const doctors = await DoctorProfile.find({ isActive: true }).select('-user');
    res.status(200).json({ success: true, data: doctors });
  }

  static async getDoctorBySlug(req: Request, res: Response): Promise<void> {
    const doctor = await DoctorProfile.findOne({ slug: req.params.slug, isActive: true });
    if (!doctor) {
      res.status(404).json({ success: false, message: 'Doctor not found' });
      return;
    }
    res.status(200).json({ success: true, data: doctor });
  }

  static async getDoctorAppointments(req: AuthRequest, res: Response): Promise<void> {
    const doctor = await DoctorProfile.findOne({ user: req.user!.userId });
    if (!doctor) {
      res.status(404).json({ success: false, message: 'Doctor profile not found' });
      return;
    }

    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate('patient')
      .sort({ preferredDate: 1 });

    res.status(200).json({ success: true, data: appointments });
  }

  static async getDoctorPatients(req: AuthRequest, res: Response): Promise<void> {
    const doctor = await DoctorProfile.findOne({ user: req.user!.userId });
    if (!doctor) {
      res.status(404).json({ success: false, message: 'Doctor profile not found' });
      return;
    }

    const patientIds = await Appointment.distinct('patient', { doctor: doctor._id });
    const patients = await Patient.find({
      $or: [
        { _id: { $in: patientIds } },
        { primaryDoctor: doctor._id }
      ]
    });

    res.status(200).json({ success: true, data: patients });
  }
}
