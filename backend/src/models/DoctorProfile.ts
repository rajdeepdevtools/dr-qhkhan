import { Schema, model, Document, Types } from 'mongoose';

export interface IDoctorProfileDocument extends Document {
  slug: string;
  name: string;
  degrees: string[];
  registrationNumber?: string;
  specialization: string;
  designation: string;
  experienceYears?: number;
  bio: string;
  photoUrl?: string;
  clinicSchedule: {
    days: string[];
    morning: string;
    evening: string;
  };
  isActive: boolean;
  isDeceased?: boolean;
  user?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const doctorProfileSchema = new Schema<IDoctorProfileDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    degrees: [{ type: String, required: true }],
    registrationNumber: { type: String },
    specialization: { type: String, required: true },
    designation: { type: String, required: true },
    experienceYears: { type: Number, default: 0 },
    bio: { type: String, required: true },
    photoUrl: { type: String },
    clinicSchedule: {
      days: [{ type: String }],
      morning: { type: String, required: true },
      evening: { type: String, required: true },
    },
    isActive: { type: Boolean, default: true },
    isDeceased: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const DoctorProfile = model<IDoctorProfileDocument>('DoctorProfile', doctorProfileSchema);
