import dotenv from 'dotenv';
import path from 'path';

// Load root or local .env
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const ENV = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb+srv://demo:demo123@cluster0.mongodb.net/dr_qh_khan_clinic?retryWrites=true&w=majority',
  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET || 'fallback_access_secret_change_in_production_32chars',
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_change_in_production_32chars',
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  WEBSITE_URL: process.env.WEBSITE_URL || 'http://localhost:3000',
  ADMIN_URL: process.env.ADMIN_URL || 'http://localhost:3001',
  PROD_WEBSITE_URL: process.env.PROD_WEBSITE_URL || 'https://dr-qhkhan-website.vercel.app',
  PROD_ADMIN_URL: process.env.PROD_ADMIN_URL || 'https://dr-qhkhan-admin.vercel.app',
  API_URL: process.env.API_URL || 'http://localhost:5000/api',
  PROD_API_URL: process.env.PROD_API_URL || 'https://dr-qhkhan.onrender.com/api',
  STORAGE_PROVIDER: process.env.STORAGE_PROVIDER || 'local',
  STORAGE_BUCKET: process.env.STORAGE_BUCKET || 'medical-uploads',
  KEEP_ALIVE_ENABLED: process.env.KEEP_ALIVE_ENABLED !== 'false',
  KEEP_ALIVE_INTERVAL_MINUTES: parseInt(process.env.KEEP_ALIVE_INTERVAL_MINUTES || '10', 10),
  KEEP_ALIVE_URL: process.env.KEEP_ALIVE_URL || '',
};
