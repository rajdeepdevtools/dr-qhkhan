# Security Specifications & Hardening Guidelines

## 1. Authentication & Session Management
- **Short-Lived Access Tokens**: JWT access tokens expire after 15 minutes.
- **Refresh Token Rotation**: Refresh tokens are stored in `httpOnly`, `Secure`, `SameSite=Strict` cookies.
- **Password Hashing**: Passwords stored using bcrypt with minimum salt rounds of 10. No plaintext passwords logged or persisted.

## 2. Role-Based Access Control (RBAC)
- Enforced at backend API route middleware level.
- Roles matrix:
  - `patient`: Can view own appointments, submit appointments, view own finalized medical reports.
  - `doctor`: Can view assigned appointments, assigned patients, draft reports, finalize reports.
  - `receptionist`: Can view/manage clinic appointments, register walk-in patients, update status, assign doctors. Cannot edit clinical reports.
  - `admin` / `super_admin`: Full administrative access to clinic settings, doctors, staff accounts, patients, blogs, feedback, audit logs.

## 3. Data Isolation & IDOR Protection
- Patient A cannot access Patient B's records; verified at controller layer via token `user._id` comparison.
- Doctor A cannot access Doctor B's restricted patient records unless assigned.

## 4. Medical Report Integrity
- Once a report status is changed to `finalized`, normal edit endpoints reject modifications.
- Amendments are appended with timestamp, reason, and actor ID into `amendments` array to ensure audit compliance.

## 5. Defense in Depth
- **Helmet**: Set security HTTP headers.
- **CORS**: Restricted strictly to configured `WEBSITE_URL` and `ADMIN_URL`.
- **Rate Limiting**: Protects login, registration, and appointment endpoints against brute-force attacks.
- **NoSQL Injection**: Input sanitization strips `$` and `.` mongo operator keys.
- **XSS & Content Security Policy**: Escape dynamic output and enforce HTML sanitization.
- **Audit Logging**: All security actions logged to `auditlogs` collection.
