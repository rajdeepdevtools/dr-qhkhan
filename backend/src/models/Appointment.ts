import { Schema, model, Document, Types } from 'mongoose';
import { AppointmentStatus } from '@hospital/shared-types';

export interface IAppointmentDocument extends Document {
  appointmentId: string; // HOSP-APT-YYYYMMDD-XXXX
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  department: string;
  doctor?: Types.ObjectId;
  doctorName?: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  medicalDocuments?: string[];
  paymentScreenshot?: string;
  consent: boolean;
  status: AppointmentStatus;
  patient?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointmentDocument>(
  {
    appointmentId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true, index: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    department: { type: String, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'DoctorProfile', index: true },
    doctorName: { type: String },
    preferredDate: { type: String, required: true, index: true },
    preferredTime: { type: String, required: true },
    message: { type: String },
    medicalDocuments: [{ type: String }],
    paymentScreenshot: { type: String },
    consent: { type: Boolean, required: true, default: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', index: true },
  },
  { timestamps: true }
);

export const Appointment = model<IAppointmentDocument>('Appointment', appointmentSchema);
