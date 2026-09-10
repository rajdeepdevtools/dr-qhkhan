import { createApp } from './app';
import { connectDatabase } from './config/database';
import { ENV } from './config/env';
import { startKeepAliveService } from './services/keepAliveService';

const startServer = async () => {
  await connectDatabase();

  const app = createApp();
  const PORT = parseInt(ENV.PORT, 10) || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Clinic Backend API running on http://localhost:${PORT}`);
    console.log(`🔗 Allowed CORS Origins: ${ENV.WEBSITE_URL}, ${ENV.ADMIN_URL}`);
    
    // Start automated background keep-alive ping service to prevent server sleep
    startKeepAliveService();
  });
};

startServer();
