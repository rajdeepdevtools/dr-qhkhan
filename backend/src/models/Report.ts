import { Schema, model, Document, Types } from 'mongoose';
import { ReportStatus, IVitals, IPrescriptionItem } from '@hospital/shared-types';

export interface IReportDocument extends Document {
  reportId: string;
  patient: Types.ObjectId;
  patientName: string;
  doctor: Types.ObjectId;
  doctorName: string;
  dateOfVisit: string;
  symptoms: string[];
  diagnosis: string;
  vitals: IVitals;
  prescription: IPrescriptionItem[];
  doctorNotes?: string;
  status: ReportStatus;
  finalizedAt?: Date;
  amendments: Array<{
    amendedBy: string;
    amendedAt: Date;
    reason: string;
    previousDiagnosis: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReportDocument>(
  {
    reportId: { type: String, required: true, unique: true, index: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    patientName: { type: String, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'DoctorProfile', required: true, index: true },
    doctorName: { type: String, required: true },
    dateOfVisit: { type: String, required: true },
    symptoms: [{ type: String, required: true }],
    diagnosis: { type: String, required: true },
    vitals: {
      bloodPressure: { type: String },
      pulseRate: { type: Number },
      weightKg: { type: Number },
      temperatureF: { type: Number },
    },
    prescription: [
      {
        medicineName: { type: String, required: true },
        dosage: { type: String, required: true },
        timing: { type: String, required: true },
        durationDays: { type: Number, required: true },
        notes: { type: String },
      },
    ],
    doctorNotes: { type: String },
    status: { type: String, enum: ['draft', 'finalized'], default: 'draft', index: true },
    finalizedAt: { type: Date },
    amendments: [
      {
        amendedBy: { type: String, required: true },
        amendedAt: { type: Date, default: Date.now },
        reason: { type: String, required: true },
        previousDiagnosis: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Report = model<IReportDocument>('Report', reportSchema);
