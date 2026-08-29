import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ClinicSettings } from '../models/ClinicSettings';

export class SettingsController {
  static async getSettings(req: Request, res: Response): Promise<void> {
    let settings = await ClinicSettings.findOne();
    if (!settings) {
      settings = await ClinicSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  }

  static async updateSettings(req: AuthRequest, res: Response): Promise<void> {
    let settings = await ClinicSettings.findOne();
    if (!settings) {
      settings = new ClinicSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.status(200).json({ success: true, message: 'Clinic settings updated', data: settings });
  }
}
