import { Router } from 'express';
import { InquiryController } from '../controllers/inquiryController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';
import { validateRequest } from '../middleware/validate';
import { inquirySchema } from '@hospital/validation';

const router = Router();

router.post('/', validateRequest(inquirySchema), InquiryController.submitInquiry);

router.get('/admin', authenticateJWT, authorizeRoles('admin', 'super_admin', 'receptionist'), InquiryController.getAllInquiriesAdmin);
router.put('/:id/status', authenticateJWT, authorizeRoles('admin', 'super_admin', 'receptionist'), InquiryController.updateInquiryStatus);
router.delete('/:id', authenticateJWT, authorizeRoles('admin', 'super_admin', 'receptionist'), InquiryController.deleteInquiry);

export default router;
