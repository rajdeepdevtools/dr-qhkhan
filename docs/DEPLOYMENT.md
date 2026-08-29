# Deployment Specification

## Production Topology

1. **Public Website Application**:
   - Subdomain/Domain: `https://yourdomain.com`
   - Platform: Vercel / Netlify / AWS Amplify / Docker GAE
   - Build Command: `pnpm --filter website build`
   - Start Command: `pnpm --filter website start`

2. **Admin Application (Completely Separate)**:
   - Subdomain/Domain: `https://admin.yourdomain.com`
   - Platform: Vercel / Netlify / AWS Amplify / Docker GAE
   - Build Command: `pnpm --filter admin build`
   - Start Command: `pnpm --filter admin start`

3. **Backend REST API**:
   - Subdomain/Domain: `https://api.yourdomain.com`
   - Platform: AWS ECS / Google Cloud Run / DigitalOcean App Platform / Node Server
   - Build Command: `pnpm --filter backend build`
   - Start Command: `node backend/dist/server.js`

4. **Database**:
   - MongoDB Atlas M10+ Cluster with TLS/SSL, IP Whitelisting, and automated daily snapshots.

## Environment Variables Strategy
- Public website receives `NEXT_PUBLIC_API_URL` pointing to backend API.
- Admin app receives `NEXT_PUBLIC_API_URL` pointing to backend API.
- Backend API receives `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `WEBSITE_URL`, and `ADMIN_URL` for strict CORS origin checking.
