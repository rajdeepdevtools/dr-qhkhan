# Architecture & System Design Specification

## System Overview

The platform for **DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC** is engineered as a decoupled monorepo containing three primary executable applications:

1. **Public Website & Patient/Doctor Portal (`apps/website`)**:
   - Built on Next.js 14 App Router, React, TypeScript, and Tailwind CSS.
   - Serves general visitors, patients booking appointments, patient medical portal, and doctor management workflows.
   - Deployed independently on `yourdomain.com`.

2. **Completely Separate Admin Application (`apps/admin`)**:
   - Built on Next.js 14 App Router, React, TypeScript, and Tailwind CSS.
   - Handles patient administration, doctor credentials, staff creation, clinic schedules, blog publishing, and audit monitoring.
   - Deployed independently on `admin.yourdomain.com`.
   - **Crucial Security Requirement**: Contains ZERO admin routes inside the website.

3. **Backend REST API Server (`backend`)**:
   - Built on Node.js, Express, TypeScript, and Mongoose for MongoDB Atlas.
   - Handles JWT authentication, Zod request validation, RBAC, file uploads, printable report generation, and audit logging.
   - Deployed independently on `api.yourdomain.com`.

```
                    ┌─────────────────────────┐
                    │  Public Website & Portal│
                    │   (apps/website)        │
                    │   yourdomain.com        │
                    └────────────┬────────────┘
                                 │
                                 │ HTTPS REST API
                                 ▼
┌───────────────────────┐   ┌────────────────────────┐   ┌────────────────────────┐
│ Separate Admin Panel  │──>│  Backend REST API      │──>│ MongoDB Atlas Cluster  │
│ (apps/admin)          │   │  (backend)             │   │ (Cloud Database)       │
│ admin.yourdomain.com  │   │  api.yourdomain.com    │   └────────────────────────┘
└───────────────────────┘   └────────────────────────┘
```

## Shared Packages Architecture

- `@hospital/shared-types`: Standard TypeScript interfaces for User, Doctor, Patient, Appointment, Report, Vitals, Prescription, AuditLog, and API payloads.
- `@hospital/validation`: Universal Zod schemas enforcing exact payload contracts on both client and backend servers.
- `@hospital/ui`: Shared brand design tokens, color palette, and clinic information constants.
