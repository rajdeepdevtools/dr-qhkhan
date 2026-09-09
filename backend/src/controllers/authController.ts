import { Request, Response } from 'express';
import { User } from '../models/User';
import { Patient } from '../models/Patient';
import { DoctorProfile } from '../models/DoctorProfile';
import { ReceptionistProfile } from '../models/ReceptionistProfile';
import { AuthService } from '../services/authService';
import { AuditService } from '../services/auditService';
import { AuthRequest } from '../middleware/auth';

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const { email, password, name, phone, age, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
        code: 'USER_EXISTS',
      });
      return;
    }

    const hashedPassword = await AuthService.hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'patient',
    });

    const patientId = `HOSP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const patient = await Patient.create({
      patientId,
      name,
      email,
      phone,
      age,
      gender,
      registeredUser: user._id,
    });

    const tokens = AuthService.generateTokens({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    user.refreshToken = tokens.refreshToken;
    await user.save();

    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    await AuditService.logAction({
      actorId: user._id.toString(),
      actorEmail: user.email,
      actorRole: user.role,
      action: 'PATIENT_REGISTER',
      resourceType: 'Patient',
      resourceId: patient.patientId,
      ipAddress: req.ip,
    });

    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      data: {
        user: { id: user._id, email: user.email, role: user.role },
        patient,
        token: tokens.accessToken,
      },
    });
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials or inactive account',
        code: 'INVALID_CREDENTIALS',
      });
      return;
    }

    const isMatch = await AuthService.comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS',
      });
      return;
    }

    const tokens = AuthService.generateTokens({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    user.refreshToken = tokens.refreshToken;
    await user.save();

    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    let profile: any = null;
    if (user.role === 'patient') {
      profile = await Patient.findOne({ registeredUser: user._id });
    } else if (user.role === 'doctor') {
      profile = await DoctorProfile.findOne({ user: user._id });
    } else if (user.role === 'receptionist') {
      profile = await ReceptionistProfile.findOne({ user: user._id });
    }

    await AuditService.logAction({
      actorId: user._id.toString(),
      actorEmail: user.email,
      actorRole: user.role,
      action: 'USER_LOGIN',
      resourceType: 'User',
      resourceId: user._id.toString(),
      ipAddress: req.ip,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: { id: user._id, email: user.email, role: user.role },
        profile,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  }

  static async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message: 'Refresh token required',
        code: 'TOKEN_REQUIRED',
      });
      return;
    }

    try {
      const decoded = AuthService.verifyRefreshToken(refreshToken);
      const user = await User.findById(decoded.userId);

      if (!user || user.refreshToken !== refreshToken || !user.isActive) {
        res.status(401).json({
          success: false,
          message: 'Invalid refresh token',
          code: 'INVALID_TOKEN',
        });
        return;
      }

      const tokens = AuthService.generateTokens({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      user.refreshToken = tokens.refreshToken;
      await user.save();

      setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

      res.status(200).json({
        success: true,
        message: 'Tokens refreshed successfully',
        data: { token: tokens.accessToken, refreshToken: tokens.refreshToken },
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: 'Expired or invalid refresh token',
        code: 'INVALID_TOKEN',
      });
    }
  }

  static async logout(req: AuthRequest, res: Response): Promise<void> {
    if (req.user) {
      await User.findByIdAndUpdate(req.user.userId, { $unset: { refreshToken: 1 } });
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  }

  static async me(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const user = await User.findById(req.user.userId).select('-password -refreshToken');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    let profile: any = null;
    if (user.role === 'patient') {
      profile = await Patient.findOne({ registeredUser: user._id });
    } else if (user.role === 'doctor') {
      profile = await DoctorProfile.findOne({ user: user._id });
    } else if (user.role === 'receptionist') {
      profile = await ReceptionistProfile.findOne({ user: user._id });
    }

    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : undefined);

    res.status(200).json({
      success: true,
      data: {
        user,
        profile,
        token,
      },
    });
  }
}
