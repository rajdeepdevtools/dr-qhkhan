import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';
import { ReceptionistProfile } from '../models/ReceptionistProfile';
import { AuthService } from '../services/authService';
import { AuditService } from '../services/auditService';

export class StaffController {
  static async createReceptionist(req: AuthRequest, res: Response): Promise<void> {
    const { name, email, password, phone, shift } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'User with this email already exists' });
      return;
    }

    const hashedPassword = await AuthService.hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'receptionist',
    });

    const employeeId = `STF-${Math.floor(1000 + Math.random() * 9000)}`;

    const profile = await ReceptionistProfile.create({
      name,
      employeeId,
      phone,
      shift: shift || 'General Shift',
      user: user._id,
    });

    await AuditService.logAction({
      actorId: req.user!.userId,
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'ADMIN_CREATE_STAFF',
      resourceType: 'ReceptionistProfile',
      resourceId: employeeId,
      ipAddress: req.ip,
    });

    res.status(201).json({
      success: true,
      message: 'Receptionist / Staff account created successfully',
      data: { user: { id: user._id, email: user.email, role: user.role }, profile },
    });
  }

  static async getStaffList(req: AuthRequest, res: Response): Promise<void> {
    const staff = await ReceptionistProfile.find().populate('user', 'email isActive createdAt').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: staff });
  }
}
