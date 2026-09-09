import { Router } from 'express';
import { InvoiceController } from '../controllers/invoiceController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = Router();

// Protect all billing endpoints to admin, receptionist, or super_admin
router.use(authenticateJWT);
router.use(authorizeRoles('admin', 'receptionist', 'super_admin'));

router.post('/', InvoiceController.createInvoice);
router.get('/', InvoiceController.getInvoices);
router.get('/:id', InvoiceController.getInvoiceById);
router.put('/:id', InvoiceController.updateInvoice);
router.delete('/:id', InvoiceController.deleteInvoice);

export default router;
