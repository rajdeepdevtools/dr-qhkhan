import { Schema, model, Document } from 'mongoose';
import { FeedbackStatus } from '@hospital/shared-types';

export interface IFeedbackDocument extends Document {
  patientName: string;
  rating: number;
  message: string;
  appointmentRef?: string;
  status: FeedbackStatus;
  createdAt: Date;
  updatedAt: Date;
}

const feedbackSchema = new Schema<IFeedbackDocument>(
  {
    patientName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
    appointmentRef: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
  },
  { timestamps: true }
);

export const Feedback = model<IFeedbackDocument>('Feedback', feedbackSchema);
