import { Router } from 'express';
import { HealthController } from '../controllers/healthController';

const router = Router();

// Detailed health check
router.get('/', HealthController.getHealth);

// Lightweight ping endpoint for keep-alive monitoring
router.get('/ping', HealthController.ping);

export default router;
