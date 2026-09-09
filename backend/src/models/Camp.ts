import { Schema, model, Document } from 'mongoose';

export interface ICampDocument extends Document {
  title: string;
  description: string;
  date: string;
  location: string;
  doctor: string;
  imageUrl: string;
  isActive: boolean;
  isUpcomingPopup: boolean;
  timing: string;
  helplinePhone: string;
  createdAt: Date;
  updatedAt: Date;
}

const campSchema = new Schema<ICampDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    doctor: { type: String, default: 'Dr. I. Khan' },
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isUpcomingPopup: { type: Boolean, default: false },
    timing: { type: String, default: '' },
    helplinePhone: { type: String, default: '9135404090' },
  },
  { timestamps: true }
);

export const Camp = model<ICampDocument>('Camp', campSchema);

