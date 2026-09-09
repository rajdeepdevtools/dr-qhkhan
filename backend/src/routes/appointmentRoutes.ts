import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { appointmentSchema } from '@hospital/validation';

const router = Router();

router.post('/', validateRequest(appointmentSchema), AppointmentController.createAppointment);
router.get('/:id', authenticateJWT, AppointmentController.getAppointmentById);
router.put(
  '/:id/status',
  authenticateJWT,
  authorizeRoles('admin', 'super_admin', 'receptionist', 'doctor'),
  AppointmentController.updateAppointmentStatus
);
router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin', 'super_admin', 'receptionist'),
  AppointmentController.updateAppointment
);
router.delete(
  '/:id',
  authorizeRoles('admin', 'super_admin'),
  AppointmentController.deleteAppointment
);

export default router;
