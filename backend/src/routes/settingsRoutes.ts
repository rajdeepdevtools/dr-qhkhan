import { Router } from 'express';
import { SettingsController } from '../controllers/settingsController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { clinicSettingsSchema } from '@hospital/validation';

const router = Router();

router.get('/', SettingsController.getSettings);
router.put('/', authenticateJWT, authorizeRoles('admin', 'super_admin'), validateRequest(clinicSettingsSchema), SettingsController.updateSettings);

export default router;
