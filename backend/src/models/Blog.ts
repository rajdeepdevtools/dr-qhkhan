import { Schema, model, Document } from 'mongoose';

export interface IBlogDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  category: string;
  isPublished: boolean;
  publishedAt?: Date;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlogDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    author: { type: String, required: true },
    category: { type: String, required: true },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

export const Blog = model<IBlogDocument>('Blog', blogSchema);
