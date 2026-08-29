# DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC — Monorepo Platform

Production-ready web platform for **DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC** (Established 1958, Nagmatia Road, Gaya, Bihar, India).

## 🏗️ Architecture Overview

The system is structured as a pnpm monorepo with strict application isolation:

- **`apps/website`**: Main Public Website & Patient / Doctor Portal (`yourdomain.com`) built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Bilingual support (English & Hindi).
- **`apps/admin`**: Completely separate Admin & Staff Panel (`admin.yourdomain.com`) built with Next.js 14 App Router and TypeScript. Contains **zero admin routes inside the website**.
- **`backend`**: Node.js + Express + TypeScript REST API (`api.yourdomain.com`) connected to MongoDB Atlas, with JWT cookie authentication, Zod input validation, RBAC, and Audit Logging.
- **`packages/shared-types`**: Shared TypeScript definitions across backend and frontends.
- **`packages/validation`**: Shared Zod schemas for forms and API requests.
- **`packages/shared-config`**: Shared tsconfig presets.
- **`packages/ui`**: Shared UI design tokens and constants.
- **`docs/`**: Comprehensive system architecture, API, database, security, and deployment documentation.

---

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- MongoDB Atlas Connection URI

### Installation & Development Setup

1. **Install workspace dependencies**:
   ```bash
   pnpm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env` in the root and configure `MONGODB_URI` and secrets:
   ```bash
   cp .env.example .env
   ```

3. **Seed Development Database**:
   Populate MongoDB with default clinic settings, doctors, demo patients, demo appointments, and admin credentials:
   ```bash
   pnpm seed
   ```

4. **Start All Applications in Development**:
   ```bash
   pnpm dev
   ```
   - Public Website: http://localhost:3000
   - Admin Panel: http://localhost:3001
   - Backend REST API: http://localhost:5000/api

---

## 🔑 Demo Access Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@drqhkhanclinic.com` | `Admin@DrQHKhan1958!` |
| Receptionist | `staff@drqhkhanclinic.com` | `Staff@DrQHKhan1958!` |
| Managing Doctor | `drikhan@drqhkhanclinic.com` | `Doctor@DrQHKhan1958!` |
| Patient | `patient@example.com` | `Patient@123456` |

---

## 📚 Technical Documentation

Detailed guides are located in the `docs/` folder:
- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Database Schema & Indexes](docs/DATABASE.md)
- [Security Specifications](docs/SECURITY.md)
- [Production Deployment Guide](docs/DEPLOYMENT.md)
