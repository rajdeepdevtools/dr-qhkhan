import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Inquiry } from '../models/Inquiry';

export class InquiryController {
  static async submitInquiry(req: Request, res: Response): Promise<void> {
    const { name, phone, subject, message } = req.body;
    const inquiry = await Inquiry.create({
      name,
      phone,
      subject,
      message,
      status: 'pending',
    });
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: inquiry });
  }

  static async getAllInquiriesAdmin(req: AuthRequest, res: Response): Promise<void> {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: inquiries });
  }

  static async updateInquiryStatus(req: AuthRequest, res: Response): Promise<void> {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Inquiry status updated', data: inquiry });
  }

  static async deleteInquiry(req: AuthRequest, res: Response): Promise<void> {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
  }
}
