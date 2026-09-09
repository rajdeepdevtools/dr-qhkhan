import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Invoice } from '../models/Invoice';
import { Patient } from '../models/Patient';
import { AuditService } from '../services/auditService';

export class InvoiceController {
  static async createInvoice(req: AuthRequest, res: Response): Promise<void> {
    const { patientId, date, items, totalAmount, discountAmount, finalAmount, paymentStatus, paymentMethod } = req.body;

    const patientRecord = await Patient.findById(patientId);
    if (!patientRecord) {
      res.status(444).json({ success: false, message: 'Patient not found' });
      return;
    }

    const invoiceId = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const invoice = await Invoice.create({
      invoiceId,
      patient: patientRecord._id,
      patientName: patientRecord.name,
      date: date || new Date().toISOString().slice(0, 10),
      items,
      totalAmount,
      discountAmount: discountAmount || 0,
      finalAmount,
      paymentStatus: paymentStatus || 'unpaid',
      paymentMethod: paymentMethod || 'none',
    });

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_CREATE_INVOICE',
      resourceType: 'Invoice',
      resourceId: invoice.invoiceId,
      ipAddress: req.ip,
    });

    res.status(201).json({ success: true, message: 'Invoice created successfully', data: invoice });
  }

  static async getInvoices(req: AuthRequest, res: Response): Promise<void> {
    const { search } = req.query;
    let query: any = {};

    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      query = {
        $or: [
          { invoiceId: searchRegex },
          { patientName: searchRegex },
        ],
      };
    }

    const invoices = await Invoice.find(query).populate('patient', 'patientId phone email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: invoices });
  }

  static async getInvoiceById(req: AuthRequest, res: Response): Promise<void> {
    const invoice = await Invoice.findById(req.params.id).populate('patient');
    if (!invoice) {
      res.status(444).json({ success: false, message: 'Invoice not found' });
      return;
    }
    res.status(200).json({ success: true, data: invoice });
  }

  static async updateInvoice(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { patientId, date, items, totalAmount, discountAmount, finalAmount, paymentStatus, paymentMethod } = req.body;

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      res.status(404).json({ success: false, message: 'Invoice not found' });
      return;
    }

    if (patientId) {
      const patientRecord = await Patient.findById(patientId);
      if (patientRecord) {
        invoice.patient = patientRecord._id as any;
        invoice.patientName = patientRecord.name;
      }
    }

    invoice.date = date ?? invoice.date;
    invoice.items = items ?? invoice.items;
    invoice.totalAmount = totalAmount ?? invoice.totalAmount;
    invoice.discountAmount = discountAmount !== undefined ? discountAmount : invoice.discountAmount;
    invoice.finalAmount = finalAmount ?? invoice.finalAmount;
    invoice.paymentStatus = paymentStatus ?? invoice.paymentStatus;
    invoice.paymentMethod = paymentMethod ?? invoice.paymentMethod;

    await invoice.save();

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_UPDATE_INVOICE',
      resourceType: 'Invoice',
      resourceId: invoice.invoiceId,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Invoice updated successfully', data: invoice });
  }

  static async deleteInvoice(req: AuthRequest, res: Response): Promise<void> {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      res.status(444).json({ success: false, message: 'Invoice not found' });
      return;
    }

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_DELETE_INVOICE',
      resourceType: 'Invoice',
      resourceId: invoice.invoiceId,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
  }
}
