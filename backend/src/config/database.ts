import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDatabase = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(ENV.MONGODB_URI);
    console.log('✅ MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('❌ MongoDB Atlas connection error:', error);
    if (ENV.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
