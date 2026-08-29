import { Schema, model, Document } from 'mongoose';
import { InquiryStatus } from '@hospital/shared-types';

export interface IInquiryDocument extends Document {
  name: string;
  phone: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiryDocument>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'resolved', 'ignored'], default: 'pending', index: true },
  },
  { timestamps: true }
);

export const Inquiry = model<IInquiryDocument>('Inquiry', inquirySchema);
