import cors from 'cors';
import { ENV } from './env';

const allowedOrigins = [
  ENV.WEBSITE_URL,
  ENV.ADMIN_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'https://dr-qhkhan-website.vercel.app',
  'https://dr-qhkhan-admin.vercel.app',
  process.env.PROD_WEBSITE_URL,
  process.env.PROD_ADMIN_URL,
].filter(Boolean);

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy rejection for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
