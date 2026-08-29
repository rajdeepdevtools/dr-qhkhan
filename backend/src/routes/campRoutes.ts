import { Router } from 'express';
import { CampController } from '../controllers/campController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { campSchema } from '@hospital/validation';

const router = Router();

// Public route
router.get('/', CampController.getActiveCamps);

// Admin only routes
router.use(authenticateJWT, authorizeRoles('admin', 'super_admin'));
router.get('/admin', CampController.getAllCampsAdmin);
router.post('/', validateRequest(campSchema), CampController.createCamp);
router.put('/:id', validateRequest(campSchema), CampController.updateCamp);
router.delete('/:id', CampController.deleteCamp);

export default router;
