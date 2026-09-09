import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { doctorSchema } from '@hospital/validation';

const router = Router();

router.use(authenticateJWT);

router.get('/dashboard', authorizeRoles('admin', 'super_admin', 'receptionist'), AdminController.getDashboardMetrics);
router.get('/patients', authorizeRoles('admin', 'super_admin', 'receptionist'), AdminController.getPatients);
router.post('/patients', authorizeRoles('admin', 'super_admin', 'receptionist'), AdminController.createPatient);
router.put('/patients/:id', authorizeRoles('admin', 'super_admin', 'receptionist'), AdminController.updatePatient);
router.delete('/patients/:id', authorizeRoles('admin', 'super_admin'), AdminController.deletePatient);

router.post('/doctors', authorizeRoles('admin', 'super_admin'), validateRequest(doctorSchema), AdminController.createDoctor);
router.put('/doctors/:id', authorizeRoles('admin', 'super_admin'), AdminController.updateDoctor);
router.delete('/doctors/:id', authorizeRoles('admin', 'super_admin'), AdminController.deleteDoctor);

router.get('/appointments', authorizeRoles('admin', 'super_admin', 'receptionist'), AdminController.getAppointments);
router.get('/audit-logs', authorizeRoles('admin', 'super_admin'), AdminController.getAuditLogs);

export default router;
