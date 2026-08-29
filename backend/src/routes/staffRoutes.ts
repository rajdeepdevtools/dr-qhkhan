import { Router } from 'express';
import { StaffController } from '../controllers/staffController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { staffSchema } from '@hospital/validation';

const router = Router();

router.use(authenticateJWT);

router.post(
  '/',
  authorizeRoles('admin', 'super_admin'),
  validateRequest(staffSchema),
  StaffController.createReceptionist
);

router.get(
  '/',
  authorizeRoles('admin', 'super_admin', 'receptionist'),
  StaffController.getStaffList
);

export default router;
