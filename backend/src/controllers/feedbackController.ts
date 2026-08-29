import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Feedback } from '../models/Feedback';

export class FeedbackController {
  static async submitFeedback(req: Request, res: Response): Promise<void> {
    const { patientName, rating, message, appointmentRef } = req.body;
    const feedback = await Feedback.create({
      patientName,
      rating,
      message,
      appointmentRef,
      status: 'pending',
    });
    res.status(201).json({ success: true, message: 'Feedback submitted for moderation', data: feedback });
  }

  static async getApprovedFeedback(req: Request, res: Response): Promise<void> {
    const feedback = await Feedback.find({ status: 'approved' }).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, data: feedback });
  }

  static async getAllFeedbackAdmin(req: AuthRequest, res: Response): Promise<void> {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: feedback });
  }

  static async updateFeedbackStatus(req: AuthRequest, res: Response): Promise<void> {
    const { status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json({ success: true, message: 'Feedback status updated', data: feedback });
  }
}
