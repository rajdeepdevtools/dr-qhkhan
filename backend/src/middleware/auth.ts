import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { UserRole } from '@hospital/shared-types';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: UserRole;
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token =
    req.cookies?.accessToken ||
    (req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null);

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Authentication required. No token provided.',
      code: 'UNAUTHORIZED',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET) as {
      userId: string;
      email: string;
      role: UserRole;
    };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired access token.',
      code: 'INVALID_TOKEN',
    });
  }
};
