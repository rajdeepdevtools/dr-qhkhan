import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateJWT } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { authRateLimiter } from '../middleware/rateLimiter';
import { registerSchema, loginSchema } from '@hospital/validation';

const router = Router();

router.post('/register', authRateLimiter, validateRequest(registerSchema), AuthController.register);
router.post('/login', authRateLimiter, validateRequest(loginSchema), AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', authenticateJWT, AuthController.logout);
router.get('/me', authenticateJWT, AuthController.me);

export default router;
