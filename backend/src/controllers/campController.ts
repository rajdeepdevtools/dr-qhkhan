import { Request, Response } from 'express';
import { Camp } from '../models/Camp';
import { getStorageProvider } from '../config/storage';
import { AuditService } from '../services/auditService';
import { AuthRequest } from '../middleware/auth';

export class CampController {
  private static async processAndValidateImage(imageUrl: string): Promise<string> {
    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('Image URL or file is required');
    }

    const trimmed = imageUrl.trim();

    // 1. Handle base64 image file upload
    if (trimmed.startsWith('data:image/')) {
      // Format restriction: Must be JPEG / JPG
      const isJpegData = trimmed.startsWith('data:image/jpeg;base64,') || trimmed.startsWith('data:image/jpg;base64,') || trimmed.startsWith('data:image/pjpeg;base64,');
      if (!isJpegData) {
        throw new Error('Security Error: Only JPG and JPEG image formats are allowed.');
      }

      const matches = trimmed.match(/^data:image\/[A-Za-z+-]+;base64,(.+)$/);
      if (!matches || !matches[1]) {
        throw new Error('Invalid image encoding payload.');
      }

      const base64Data = matches[1];
      const buffer = Buffer.from(base64Data, 'base64');

      // Max size limit: 150 KB (150 * 1024 = 153,600 bytes)
      const MAX_SIZE_BYTES = 150 * 1024;
      if (buffer.length > MAX_SIZE_BYTES) {
        throw new Error(`File size exceeds limit. Maximum allowed size is 150 KB (Selected: ${(buffer.length / 1024).toFixed(1)} KB).`);
      }

      // Security check: JPEG Header Magic Bytes (FF D8 FF)
      if (buffer.length < 3 || buffer[0] !== 0xff || buffer[1] !== 0xd8 || buffer[2] !== 0xff) {
        throw new Error('Security Error: File headers do not match valid JPEG image signature.');
      }

      const filename = `camp_${Date.now()}.jpg`;
      const storageProvider = getStorageProvider();
      const fileKey = await storageProvider.uploadFile(buffer, filename, 'image/jpeg');
      return await storageProvider.getFileUrl(fileKey);
    }

    // 2. Handle HTTP / HTTPS Direct Image Link URL
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      try {
        const parsedUrl = new URL(trimmed);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
          throw new Error('Security Error: Only http:// and https:// image URLs are permitted.');
        }
      } catch (err: any) {
        throw new Error(err.message || 'Invalid Image URL format.');
      }
      return trimmed;
    }

    // 3. Existing upload path
    if (trimmed.startsWith('/uploads/')) {
      return trimmed;
    }

    throw new Error('Security Error: Invalid image URL or unsupported format.');
  }

  static async getActiveCamps(req: Request, res: Response): Promise<void> {
    try {
      const camps = await Camp.find({ isActive: true }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: camps });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAllCampsAdmin(req: AuthRequest, res: Response): Promise<void> {
    try {
      const camps = await Camp.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: camps });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createCamp(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, description, date, location, imageUrl } = req.body;
      
      let finalImageUrl: string;
      try {
        finalImageUrl = await CampController.processAndValidateImage(imageUrl);
      } catch (err: any) {
        res.status(400).json({ success: false, message: err.message });
        return;
      }

      const camp = await Camp.create({
        title,
        description,
        date,
        location,
        imageUrl: finalImageUrl,
        isActive: true,
      });

      // Audit log
      await AuditService.logAction({
        actorId: req.user!.userId,
        actorEmail: req.user!.email,
        actorRole: req.user!.role,
        action: 'CREATE',
        resourceType: 'Camp',
        resourceId: camp._id.toString(),
        details: `Created medical camp: ${title}`,
      });

      res.status(201).json({ success: true, message: 'Camp created successfully', data: camp });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateCamp(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, description, date, location, imageUrl, isActive } = req.body;
      
      let finalImageUrl: string;
      try {
        finalImageUrl = await CampController.processAndValidateImage(imageUrl);
      } catch (err: any) {
        res.status(400).json({ success: false, message: err.message });
        return;
      }

      const camp = await Camp.findByIdAndUpdate(
        req.params.id,
        { title, description, date, location, imageUrl: finalImageUrl, isActive },
        { new: true }
      );

      if (!camp) {
        res.status(404).json({ success: false, message: 'Camp not found' });
        return;
      }

      // Audit log
      await AuditService.logAction({
        actorId: req.user!.userId,
        actorEmail: req.user!.email,
        actorRole: req.user!.role,
        action: 'UPDATE',
        resourceType: 'Camp',
        resourceId: camp._id.toString(),
        details: `Updated medical camp: ${title}`,
      });

      res.status(200).json({ success: true, message: 'Camp updated successfully', data: camp });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteCamp(req: AuthRequest, res: Response): Promise<void> {
    try {
      const camp = await Camp.findByIdAndDelete(req.params.id);
      if (!camp) {
        res.status(404).json({ success: false, message: 'Camp not found' });
        return;
      }

      // Audit log
      await AuditService.logAction({
        actorId: req.user!.userId,
        actorEmail: req.user!.email,
        actorRole: req.user!.role,
        action: 'DELETE',
        resourceType: 'Camp',
        resourceId: camp._id.toString(),
        details: `Deleted medical camp: ${camp.title}`,
      });

      res.status(200).json({ success: true, message: 'Camp deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
