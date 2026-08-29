import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Blog } from '../models/Blog';

export class BlogController {
  static async getPublicBlogs(req: Request, res: Response): Promise<void> {
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1, createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  }

  static async getBlogBySlug(req: Request, res: Response): Promise<void> {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) {
      res.status(404).json({ success: false, message: 'Article not found' });
      return;
    }
    res.status(200).json({ success: true, data: blog });
  }

  static async getAllBlogsAdmin(req: AuthRequest, res: Response): Promise<void> {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  }

  static async createBlog(req: AuthRequest, res: Response): Promise<void> {
    const { title, excerpt, content, featuredImage, author, category, isPublished, seoTitle, seoDescription } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author,
      category,
      isPublished,
      publishedAt: isPublished ? new Date() : undefined,
      seoTitle,
      seoDescription,
    });

    res.status(201).json({ success: true, message: 'Blog post created', data: blog });
  }
}
