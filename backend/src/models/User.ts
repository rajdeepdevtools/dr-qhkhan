import { Schema, model, Document } from 'mongoose';
import { UserRole } from '@hospital/shared-types';

export interface IUserDocument extends Document {
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['patient', 'doctor', 'receptionist', 'admin', 'super_admin'],
      default: 'patient',
    },
    isActive: { type: Boolean, default: true },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export const User = model<IUserDocument>('User', userSchema);
