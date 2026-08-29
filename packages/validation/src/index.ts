import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  age: z.number().int().min(1).max(120),
  gender: z.enum(['Male', 'Female', 'Other']),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  age: z.number().int().min(1).max(120),
  gender: z.enum(['Male', 'Female', 'Other']),
  department: z.string().min(2, 'Department is required'),
  doctor: z.string().optional(),
  preferredDate: z.string().min(1, 'Date is required'),
  preferredTime: z.string().min(1, 'Time is required'),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Consent is required',
  }),
  medicalDocuments: z.array(z.string().regex(/^data:image\/(png|jpeg|jpg);base64,/, 'Only valid image files (PNG/JPG/JPEG) are allowed')).optional(),
});

export const appointmentStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  doctor: z.string().optional(),
});

export const reportSchema = z.object({
  patient: z.string().min(1, 'Patient selection is required'),
  doctor: z.string().min(1, 'Doctor is required'),
  dateOfVisit: z.string().min(1, 'Date of visit is required'),
  symptoms: z.array(z.string()).min(1, 'At least one symptom is required'),
  diagnosis: z.string().min(2, 'Diagnosis is required'),
  vitals: z.object({
    bloodPressure: z.string().optional(),
    pulseRate: z.number().optional(),
    weightKg: z.number().optional(),
    temperatureF: z.number().optional(),
  }),
  prescription: z.array(
    z.object({
      medicineName: z.string().min(1, 'Medicine name required'),
      dosage: z.string().min(1, 'Dosage required'),
      timing: z.string().min(1, 'Timing required'),
      durationDays: z.number().min(1, 'Duration required'),
      notes: z.string().optional(),
    })
  ),
  doctorNotes: z.string().optional(),
  status: z.enum(['draft', 'finalized']),
});

export const doctorSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  degrees: z.array(z.string()).min(1, 'At least one degree required'),
  registrationNumber: z.string().optional(),
  specialization: z.string().min(2, 'Specialization required'),
  designation: z.string().min(2, 'Designation required'),
  bio: z.string().min(10, 'Bio required'),
  clinicSchedule: z.object({
    days: z.array(z.string()),
    morning: z.string(),
    evening: z.string(),
  }),
});

export const staffSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10, 'Phone is required'),
  shift: z.string().min(2, 'Shift timing is required'),
});

export const blogSchema = z.object({
  title: z.string().min(5, 'Title required'),
  excerpt: z.string().min(10, 'Excerpt required'),
  content: z.string().min(20, 'Content required'),
  author: z.string().min(2, 'Author required'),
  category: z.string().min(2, 'Category required'),
  isPublished: z.boolean(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const feedbackSchema = z.object({
  patientName: z.string().min(2, 'Name required'),
  rating: z.number().int().min(1).max(5),
  message: z.string().min(5, 'Feedback message required'),
  appointmentRef: z.string().optional(),
});

export const clinicSettingsSchema = z.object({
  clinicName: z.string().min(2),
  establishedYear: z.number().int(),
  address: z.string().min(5),
  helplines: z.array(z.string()).min(1),
  whatsappNumber: z.string().min(10),
  timings: z.object({
    weekdayMorning: z.string(),
    weekdayEvening: z.string(),
    sundayTiming: z.string(),
    holidayNote: z.string(),
  }),
  disclaimerText: z.string(),
});

export const campSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  imageUrl: z.string().min(1, 'Image is required'),
});

export const videoSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  youtubeUrl: z.string().url('Invalid YouTube URL').min(1, 'YouTube URL is required'),
  category: z.enum(['testimonial', 'camp', 'general']),
  description: z.string().optional(),
});

