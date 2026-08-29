# API Documentation

Base URL: `http://localhost:5000/api` (Production: `https://api.yourdomain.com/api`)

All requests and responses use JSON. Sensitive endpoints require JWT cookies (`accessToken` & `refreshToken`).

## Response Standard

### Success Response Format
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE",
  "errors": [ ... ]
}
```

## Key Endpoint Groups

### Auth Endpoints (`/api/auth`)
- `POST /api/auth/register` - Patient Registration
- `POST /api/auth/login` - User Login (Patient, Doctor, Receptionist, Admin)
- `POST /api/auth/refresh` - Refresh Access Token
- `POST /api/auth/logout` - Logout & Clear Tokens
- `GET /api/auth/me` - Get Current Profile

### Appointments (`/api/appointments`)
- `POST /api/appointments` - Submit Online Appointment (`HOSP-APT-YYYYMMDD-XXXX`)
- `GET /api/appointments/my` - Patient's Own Appointments
- `GET /api/appointments/:id` - Get Appointment Details

### Doctors (`/api/doctors`)
- `GET /api/doctors` - Get Public Doctor List
- `GET /api/doctors/:slug` - Get Doctor Detail & Schedule

### Reports (`/api/reports`)
- `GET /api/reports/my` - Patient View Own Reports
- `GET /api/reports/:id` - View Specific Report Details

### Doctor Portal (`/api/doctor`)
- `GET /api/doctor/appointments` - Assigned Doctor Appointments
- `GET /api/doctor/patients` - Assigned Patient List
- `POST /api/doctor/reports` - Create Draft Medical Report
- `PUT /api/doctor/reports/:id` - Edit Draft Report
- `POST /api/doctor/reports/:id/finalize` - Finalize Report (Locks Editing)

### Staff / Receptionist (`/api/staff`)
- `GET /api/staff/appointments` - Clinic Appointments List
- `PUT /api/staff/appointments/:id/status` - Update Appointment Status
- `POST /api/staff/patients` - Register Walk-in Patient

### Admin Endpoints (`/api/admin`)
- `GET /api/admin/dashboard` - Clinic Overview Metrics
- `GET /api/admin/patients` - Patient Directory & Search (`HOSP-YYYY-XXXX`)
- `POST /api/admin/doctors` - Add Doctor Profile
- `POST /api/admin/staff` - Create Receptionist User
- `GET /api/admin/audit-logs` - View Security Audit Logs
- `PUT /api/admin/settings` - Update Clinic Configuration & Timings
