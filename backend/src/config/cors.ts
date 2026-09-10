import cors from 'cors';
import { ENV } from './env';

const allowedOrigins = [
  ENV.WEBSITE_URL,
  ENV.ADMIN_URL,
  ENV.PROD_WEBSITE_URL,
  ENV.PROD_ADMIN_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://dr-qhkhan-website.vercel.app',
  'https://dr-qhkhan-admin.vercel.app',
  process.env.PROD_WEBSITE_URL,
  process.env.PROD_ADMIN_URL,
  process.env.WEBSITE_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, mobile apps, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    const isAllowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.onrender.com') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.startsWith('http://') ||
      origin.startsWith('https://');

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`[CORS Blocked]: Origin ${origin} not permitted.`);
      callback(new Error(`CORS policy rejection for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};
