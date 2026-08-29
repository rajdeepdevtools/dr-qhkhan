import { createApp } from './app';
import { connectDatabase } from './config/database';
import { ENV } from './config/env';

const startServer = async () => {
  await connectDatabase();

  const app = createApp();
  const PORT = parseInt(ENV.PORT, 10) || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Clinic Backend API running on http://localhost:${PORT}`);
    console.log(`🔗 Allowed CORS Origins: ${ENV.WEBSITE_URL}, ${ENV.ADMIN_URL}`);
  });
};

startServer();
