import { Schema, model, Document } from 'mongoose';

export interface ICampDocument extends Document {
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const campSchema = new Schema<ICampDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Camp = model<ICampDocument>('Camp', campSchema);
