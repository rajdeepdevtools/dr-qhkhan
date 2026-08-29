import { Schema, model, Document, Types } from 'mongoose';

export interface IPatientDocument extends Document {
  patientId: string; // HOSP-YYYY-XXXX
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  address?: string;
  primaryDoctor?: Types.ObjectId;
  registeredUser?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<IPatientDocument>(
  {
    patientId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, index: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    bloodGroup: { type: String },
    address: { type: String },
    primaryDoctor: { type: Schema.Types.ObjectId, ref: 'DoctorProfile' },
    registeredUser: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  },
  { timestamps: true }
);

export const Patient = model<IPatientDocument>('Patient', patientSchema);
