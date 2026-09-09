import { Router } from 'express';
import { BlogController } from '../controllers/blogController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { blogSchema } from '@hospital/validation';

const router = Router();

router.get('/', BlogController.getPublicBlogs);
router.get('/:slug', BlogController.getBlogBySlug);

router.get('/admin/all', authenticateJWT, authorizeRoles('admin', 'super_admin'), BlogController.getAllBlogsAdmin);
router.post('/admin', authenticateJWT, authorizeRoles('admin', 'super_admin'), validateRequest(blogSchema), BlogController.createBlog);
router.put('/admin/:id', authenticateJWT, authorizeRoles('admin', 'super_admin'), BlogController.updateBlog);
router.delete('/admin/:id', authenticateJWT, authorizeRoles('admin', 'super_admin'), BlogController.deleteBlog);

export default router;
