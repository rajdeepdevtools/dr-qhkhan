import { Request, Response } from 'express';
import { Video } from '../models/Video';
import { AuditService } from '../services/auditService';
import { AuthRequest } from '../middleware/auth';

export class VideoController {
  static async getActiveVideos(req: Request, res: Response): Promise<void> {
    try {
      const videos = await Video.find({ isActive: true }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: videos });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAllVideosAdmin(req: AuthRequest, res: Response): Promise<void> {
    try {
      const videos = await Video.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: videos });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createVideo(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, youtubeUrl, category, description } = req.body;

      const video = await Video.create({
        title,
        youtubeUrl,
        category,
        description,
        isActive: true,
      });

      // Audit log
      await AuditService.logAction({
        actorId: req.user!.userId,
        actorEmail: req.user!.email,
        actorRole: req.user!.role,
        action: 'CREATE',
        resourceType: 'Video',
        resourceId: video._id.toString(),
        details: `Added YouTube video: ${title}`,
      });

      res.status(201).json({ success: true, message: 'Video added successfully', data: video });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateVideo(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, youtubeUrl, category, description, isActive } = req.body;

      const video = await Video.findByIdAndUpdate(
        req.params.id,
        { title, youtubeUrl, category, description, isActive },
        { new: true }
      );

      if (!video) {
        res.status(404).json({ success: false, message: 'Video not found' });
        return;
      }

      // Audit log
      await AuditService.logAction({
        actorId: req.user!.userId,
        actorEmail: req.user!.email,
        actorRole: req.user!.role,
        action: 'UPDATE',
        resourceType: 'Video',
        resourceId: video._id.toString(),
        details: `Updated YouTube video: ${title}`,
      });

      res.status(200).json({ success: true, message: 'Video updated successfully', data: video });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteVideo(req: AuthRequest, res: Response): Promise<void> {
    try {
      const video = await Video.findByIdAndDelete(req.params.id);
      if (!video) {
        res.status(404).json({ success: false, message: 'Video not found' });
        return;
      }

      // Audit log
      await AuditService.logAction({
        actorId: req.user!.userId,
        actorEmail: req.user!.email,
        actorRole: req.user!.role,
        action: 'DELETE',
        resourceType: 'Video',
        resourceId: video._id.toString(),
        details: `Deleted YouTube video: ${video.title}`,
      });

      res.status(200).json({ success: true, message: 'Video deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
