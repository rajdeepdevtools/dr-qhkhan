import { Schema, model, Document, Types } from 'mongoose';

export interface IMedicalDocumentDocument extends Document {
  patient: Types.ObjectId;
  appointment?: Types.ObjectId;
  fileKey: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  uploadedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const medicalDocumentSchema = new Schema<IMedicalDocumentDocument>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    fileKey: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const MedicalDocument = model<IMedicalDocumentDocument>(
  'MedicalDocument',
  medicalDocumentSchema
);
