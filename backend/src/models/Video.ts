import { Schema, model, Document } from 'mongoose';

export interface IVideoDocument extends Document {
  title: string;
  youtubeUrl: string;
  category: 'testimonial' | 'camp' | 'general';
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const videoSchema = new Schema<IVideoDocument>(
  {
    title: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    category: { type: String, enum: ['testimonial', 'camp', 'general'], default: 'testimonial' },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Video = model<IVideoDocument>('Video', videoSchema);
