import { Router } from 'express';
import { PatientController } from '../controllers/patientController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

router.use(authenticateJWT, authorizeRoles('patient'));

router.get('/profile', PatientController.getMyProfile);
router.get('/appointments', PatientController.getMyAppointments);
router.get('/reports', PatientController.getMyReports);

export default router;
