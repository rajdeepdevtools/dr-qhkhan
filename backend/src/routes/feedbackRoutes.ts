import { Router } from 'express';
import { FeedbackController } from '../controllers/feedbackController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { feedbackSchema } from '@hospital/validation';

const router = Router();

router.get('/approved', FeedbackController.getApprovedFeedback);
router.post('/', validateRequest(feedbackSchema), FeedbackController.submitFeedback);

router.get('/admin', authenticateJWT, authorizeRoles('admin', 'super_admin', 'receptionist'), FeedbackController.getAllFeedbackAdmin);
router.put('/:id/status', authenticateJWT, authorizeRoles('admin', 'super_admin', 'receptionist'), FeedbackController.updateFeedbackStatus);
router.delete('/:id', authenticateJWT, authorizeRoles('admin', 'super_admin', 'receptionist'), FeedbackController.deleteFeedback);

export default router;
