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

  static async updateBlog(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, excerpt, content, featuredImage, author, category, isPublished, seoTitle, seoDescription } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }

    if (title) {
      blog.title = title;
      blog.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    blog.excerpt = excerpt ?? blog.excerpt;
    blog.content = content ?? blog.content;
    blog.featuredImage = featuredImage !== undefined ? featuredImage : blog.featuredImage;
    blog.author = author ?? blog.author;
    blog.category = category ?? blog.category;
    if (typeof isPublished === 'boolean') {
      if (!blog.isPublished && isPublished) blog.publishedAt = new Date();
      blog.isPublished = isPublished;
    }
    blog.seoTitle = seoTitle !== undefined ? seoTitle : blog.seoTitle;
    blog.seoDescription = seoDescription !== undefined ? seoDescription : blog.seoDescription;

    await blog.save();

    res.status(200).json({ success: true, message: 'Blog post updated successfully', data: blog });
  }

  static async deleteBlog(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog post not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Blog post deleted successfully' });
  }
}
