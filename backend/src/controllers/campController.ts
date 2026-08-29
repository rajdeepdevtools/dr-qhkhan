import { Request, Response } from 'express';
import { Camp } from '../models/Camp';
import { getStorageProvider } from '../config/storage';
import { AuditService } from '../services/auditService';
import { AuthRequest } from '../middleware/auth';

export class CampController {
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
      let finalImageUrl = imageUrl;

      // Handle base64 image upload
      if (imageUrl && imageUrl.startsWith('data:image/')) {
        const matches = imageUrl.match(/^data:image\/([A-Za-z+-]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const extension = matches[1] === 'jpeg' ? 'jpg' : matches[1];
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, 'base64');
          const filename = `camp_${Date.now()}.${extension}`;
          
          const storageProvider = getStorageProvider();
          const fileKey = await storageProvider.uploadFile(buffer, filename, `image/${matches[1]}`);
          finalImageUrl = await storageProvider.getFileUrl(fileKey);
        }
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
      let finalImageUrl = imageUrl;

      // Handle base64 image upload if updated
      if (imageUrl && imageUrl.startsWith('data:image/')) {
        const matches = imageUrl.match(/^data:image\/([A-Za-z+-]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const extension = matches[1] === 'jpeg' ? 'jpg' : matches[1];
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, 'base64');
          const filename = `camp_${Date.now()}.${extension}`;
          
          const storageProvider = getStorageProvider();
          const fileKey = await storageProvider.uploadFile(buffer, filename, `image/${matches[1]}`);
          finalImageUrl = await storageProvider.getFileUrl(fileKey);
        }
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
