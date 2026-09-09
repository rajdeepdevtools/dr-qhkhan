import { Router } from 'express';
import { ReportController } from '../controllers/reportController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { reportSchema } from '@hospital/validation';

const router = Router();

router.use(authenticateJWT);

router.post(
  '/',
  authorizeRoles('doctor', 'admin', 'super_admin'),
  validateRequest(reportSchema),
  ReportController.createReport
);

router.put(
  '/:id',
  authorizeRoles('doctor', 'admin', 'super_admin'),
  ReportController.updateReport
);

router.get(
  '/admin/all',
  authorizeRoles('admin', 'super_admin', 'receptionist'),
  ReportController.getAllReportsAdmin
);

router.get(
  '/my',
  authorizeRoles('doctor', 'receptionist', 'admin', 'super_admin'),
  ReportController.getMyReports
);

router.get(
  '/:id',
  authorizeRoles('patient', 'doctor', 'receptionist', 'admin', 'super_admin'),
  ReportController.getReportById
);

router.delete(
  '/:id',
  authorizeRoles('admin', 'super_admin'),
  ReportController.deleteReport
);

export default router;
