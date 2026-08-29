# Security Policy & Specifications

This document outlines the security policy, vulnerability reporting process, and technical hardening specifications for the Dr. Q.H. Khan Clinic repository.

---

## 1. Security Policy

### Supported Versions
We actively support and patch security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| v1.0.x  | :white_check_mark: |
| < v1.0  | :x:                |

### Reporting a Vulnerability
If you discover a security vulnerability, please do **not** open a public issue. Instead, report it privately to our team:
1. Email the vulnerability details to **security@qhkhanclinic.com**.
2. Include steps to reproduce the issue, affected endpoints, and potential impact.
3. We will acknowledge your report within 48 hours and coordinate a fix.

---

## 2. Security Specifications & Hardening Guidelines

### Authentication & Session Management
* **Short-Lived Access Tokens**: JWT access tokens expire after 15 minutes to minimize exposure.
* **Refresh Token Rotation**: Refresh tokens are stored in secure cookies (`httpOnly`, `Secure`, `SameSite=Strict`).
* **Password Hashing**: Passwords are saved using `bcrypt` with a minimum of 10 salt rounds. Plaintext credentials are never logged or stored.

### Role-Based Access Control (RBAC)
Enforced at the backend API route middleware level. The roles matrix is structured as follows:
* `patient`: Can view own appointments, book consultations, and view own finalized medical reports.
* `doctor`: Can view assigned appointments/patients, draft reports, and finalize reports.
* `receptionist`: Can view/manage clinic appointments, register walk-in patients, update appointment statuses, and assign doctors. Cannot edit clinical reports.
* `admin` / `super_admin`: Full administrative access to clinic settings, doctors, staff accounts, patients, blogs, feedback, and audit logs.

### Data Isolation & IDOR Protection
* Patient records are protected against IDOR (Insecure Direct Object References). A patient cannot access another patient's data; this is enforced in the controller layer by comparing the token's `user.userId` with the record's patient field.
* Doctors can only access data for their assigned patients.

### Medical Report Integrity
* Once a report's status is changed to `finalized`, modification requests are rejected by the API.
* Any subsequent amendments must be appended to the `amendments` array with a timestamp, explanation, and actor ID to maintain a strict audit trail.

### Defense in Depth
* **Helmet**: Set security HTTP headers.
* **CORS**: Restricted strictly to configured `WEBSITE_URL` and `ADMIN_URL`.
* **Rate Limiting**: Protects login, registration, and appointment endpoints against brute-force attacks.
* **NoSQL Injection**: Input sanitization strips `$` and `.` MongoDB operator keys.
* **XSS & Content Security Policy**: Escape dynamic output and enforce HTML sanitization.
* **Audit Logging**: All security actions are logged to the `auditlogs` collection.
