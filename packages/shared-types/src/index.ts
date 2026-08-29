export type UserRole = 'patient' | 'doctor' | 'receptionist' | 'admin' | 'super_admin';

export interface IUser {
  _id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPatient {
  _id: string;
  patientId: string; // HOSP-YYYY-XXXX
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  address?: string;
  primaryDoctor?: string | IDoctorProfile;
  registeredUser?: string | IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IDoctorProfile {
  _id: string;
  slug: string;
  name: string;
  degrees: string[];
  registrationNumber?: string;
  specialization: string;
  designation: string;
  experienceYears?: number;
  bio: string;
  photoUrl?: string;
  clinicSchedule: {
    days: string[];
    morning: string;
    evening: string;
  };
  isActive: boolean;
  isDeceased?: boolean;
  user?: string | IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IReceptionistProfile {
  _id: string;
  name: string;
  employeeId: string;
  phone: string;
  shift: string;
  user: string | IUser;
  createdAt: string;
  updatedAt: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface IAppointment {
  _id: string;
  appointmentId: string; // HOSP-APT-YYYYMMDD-XXXX
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  department: string;
  doctor?: string | IDoctorProfile;
  doctorName?: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  medicalDocuments?: string[];
  consent: boolean;
  status: AppointmentStatus;
  patient?: string | IPatient;
  createdAt: string;
  updatedAt: string;
}

export interface IVitals {
  bloodPressure?: string;
  pulseRate?: number;
  weightKg?: number;
  temperatureF?: number;
}

export interface IPrescriptionItem {
  medicineName: string;
  dosage: string;
  timing: string;
  durationDays: number;
  notes?: string;
}

export type ReportStatus = 'draft' | 'finalized';

export interface IReport {
  _id: string;
  reportId: string; // HOSP-REP-YYYYMMDD-XXXX
  patient: string | IPatient;
  patientName: string;
  doctor: string | IDoctorProfile;
  doctorName: string;
  dateOfVisit: string;
  symptoms: string[];
  diagnosis: string;
  vitals: IVitals;
  prescription: IPrescriptionItem[];
  doctorNotes?: string;
  status: ReportStatus;
  finalizedAt?: string;
  amendments?: Array<{
    amendedBy: string;
    amendedAt: string;
    reason: string;
    previousDiagnosis: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  category: string;
  isPublished: boolean;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export type FeedbackStatus = 'pending' | 'approved' | 'rejected';

export interface IFeedback {
  _id: string;
  patientName: string;
  rating: number;
  message: string;
  appointmentRef?: string;
  status: FeedbackStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IClinicSettings {
  clinicName: string;
  establishedYear: number;
  address: string;
  helplines: string[];
  whatsappNumber: string;
  timings: {
    weekdayMorning: string;
    weekdayEvening: string;
    sundayTiming: string;
    holidayNote: string;
  };
  disclaimerText: string;
}

export interface IAuditLog {
  _id: string;
  actor: string;
  actorEmail: string;
  actorRole: UserRole;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  timestamp: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  code?: string;
  errors?: any[];
}

export interface ICamp {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IVideo {
  _id: string;
  title: string;
  youtubeUrl: string;
  category: 'testimonial' | 'camp' | 'general';
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

