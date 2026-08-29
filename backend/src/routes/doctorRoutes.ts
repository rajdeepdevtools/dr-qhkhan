import { Router } from 'express';
import { DoctorController } from '../controllers/doctorController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

// Public doctor endpoints
router.get('/', DoctorController.getAllDoctors);
router.get('/:slug', DoctorController.getDoctorBySlug);

// Portal endpoints for authenticated doctor
router.get('/portal/appointments', authenticateJWT, authorizeRoles('doctor'), DoctorController.getDoctorAppointments);
router.get('/portal/patients', authenticateJWT, authorizeRoles('doctor'), DoctorController.getDoctorPatients);

export default router;
