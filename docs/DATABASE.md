# Database Specifications & Schema Design

Database Engine: **MongoDB Atlas**
Object Document Mapper: **Mongoose**

## Collection Indexing & Schemas

### 1. `users`
- Fields: `email` (unique index), `password` (hashed with bcrypt), `role` (enum: `patient`, `doctor`, `receptionist`, `admin`, `super_admin`), `isActive` (boolean).
- Indexes: `{ email: 1 }`, `{ role: 1 }`

### 2. `patients`
- Fields: `patientId` (unique index, `HOSP-2026-XXXX`), `name`, `email`, `phone`, `age`, `gender`, `bloodGroup`, `address`, `primaryDoctor` (ref: DoctorProfile), `registeredUser` (ref: User).
- Indexes: `{ patientId: 1 }`, `{ phone: 1 }`, `{ registeredUser: 1 }`

### 3. `doctorprofiles`
- Fields: `slug` (unique), `name`, `degrees`, `registrationNumber`, `specialization`, `designation`, `bio`, `photoUrl`, `clinicSchedule`, `user` (ref: User), `isActive`.
- Indexes: `{ slug: 1 }`, `{ user: 1 }`

### 4. `receptionistprofiles`
- Fields: `name`, `employeeId` (unique), `phone`, `shift`, `user` (ref: User).
- Indexes: `{ employeeId: 1 }`, `{ user: 1 }`

### 5. `appointments`
- Fields: `appointmentId` (unique, `HOSP-APT-YYYYMMDD-XXXX`), `name`, `email`, `phone`, `age`, `gender`, `department`, `doctor` (ref: DoctorProfile), `preferredDate`, `preferredTime`, `message`, `medicalDocuments`, `consent`, `status` (enum: `pending`, `confirmed`, `completed`, `cancelled`), `patient` (ref: Patient).
- Indexes: `{ appointmentId: 1 }`, `{ status: 1 }`, `{ preferredDate: 1 }`, `{ doctor: 1 }`, `{ patient: 1 }`

### 6. `reports`
- Fields: `reportId` (unique, `HOSP-REP-YYYYMMDD-XXXX`), `patient` (ref: Patient), `patientName`, `doctor` (ref: DoctorProfile), `doctorName`, `dateOfVisit`, `symptoms`, `diagnosis`, `vitals` (BP, pulse, weight, temp), `prescription` (array of medicine, dosage, timing, duration), `doctorNotes`, `status` (`draft`, `finalized`), `amendments`.
- Indexes: `{ reportId: 1 }`, `{ patient: 1 }`, `{ doctor: 1 }`, `{ dateOfVisit: -1 }`

### 7. `auditlogs`
- Fields: `actor` (ref: User), `actorEmail`, `actorRole`, `action`, `resourceType`, `resourceId`, `details`, `ipAddress`, `timestamp`.
- Indexes: `{ timestamp: -1 }`, `{ actorRole: 1 }`, `{ action: 1 }`
