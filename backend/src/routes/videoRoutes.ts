import { Router } from 'express';
import { VideoController } from '../controllers/videoController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { videoSchema } from '@hospital/validation';

const router = Router();

// Public route
router.get('/', VideoController.getActiveVideos);

// Admin only routes
router.use(authenticateJWT, authorizeRoles('admin', 'super_admin'));
router.get('/admin', VideoController.getAllVideosAdmin);
router.post('/', validateRequest(videoSchema), VideoController.createVideo);
router.put('/:id', validateRequest(videoSchema), VideoController.updateVideo);
router.delete('/:id', VideoController.deleteVideo);

export default router;
