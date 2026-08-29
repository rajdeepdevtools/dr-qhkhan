import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ENV } from '../config/env';
import { UserRole } from '@hospital/shared-types';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateTokens(payload: { userId: string; email: string; role: UserRole }) {
    const accessToken = jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
      expiresIn: ENV.JWT_ACCESS_EXPIRES_IN as any,
    });

    const refreshToken = jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
      expiresIn: ENV.JWT_REFRESH_EXPIRES_IN as any,
    });

    return { accessToken, refreshToken };
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET) as {
      userId: string;
      email: string;
      role: UserRole;
    };
  }
}
