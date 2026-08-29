import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { corsOptions } from './config/cors';
import { apiRateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/authRoutes';
import patientRoutes from './routes/patientRoutes';
import doctorRoutes from './routes/doctorRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import reportRoutes from './routes/reportRoutes';
import adminRoutes from './routes/adminRoutes';
import staffRoutes from './routes/staffRoutes';
import blogRoutes from './routes/blogRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import settingsRoutes from './routes/settingsRoutes';
import campRoutes from './routes/campRoutes';
import videoRoutes from './routes/videoRoutes';
import invoiceRoutes from './routes/invoiceRoutes';

export const createApp = (): express.Application => {
  const app = express();

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Serve static files from the uploads directory
  app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

  app.use('/api', apiRateLimiter);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
  });

  // Mount Modular Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/patients', patientRoutes);
  app.use('/api/doctors', doctorRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/staff', staffRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/feedback', feedbackRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/camps', campRoutes);
  app.use('/api/videos', videoRoutes);
  app.use('/api/invoices', invoiceRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
