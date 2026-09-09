import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { User } from '../models/User';
import { DoctorProfile } from '../models/DoctorProfile';
import { ReceptionistProfile } from '../models/ReceptionistProfile';
import { Patient } from '../models/Patient';
import { Appointment } from '../models/Appointment';
import { Report } from '../models/Report';
import { Blog } from '../models/Blog';
import { Feedback } from '../models/Feedback';
import { ClinicSettings } from '../models/ClinicSettings';
import { AuthService } from '../services/authService';
import { Camp } from '../models/Camp';
import { Video } from '../models/Video';

const seedDatabase = async () => {
  console.log('🌱 Starting Database Seeding...');
  await connectDatabase();

  // Clear existing collections safely for clean seed
  await User.deleteMany({});
  await DoctorProfile.deleteMany({});
  await ReceptionistProfile.deleteMany({});
  await Patient.deleteMany({});
  await Appointment.deleteMany({});
  await Report.deleteMany({});
  await Blog.deleteMany({});
  await Feedback.deleteMany({});
  await ClinicSettings.deleteMany({});
  await Camp.deleteMany({});
  await Video.deleteMany({});

  // 1. Seed Clinic Settings
  await ClinicSettings.create({
    clinicName: 'DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC',
    establishedYear: 1958,
    address: 'Nagmatia Road, Gaya, Bihar, India',
    helplines: ['9709786669', '9135404090', '9097211989'],
    whatsappNumber: '9135404090',
    timings: {
      weekdayMorning: '8:00 AM – 12:00 PM',
      weekdayEvening: '2:00 PM – 8:00 PM',
      sundayTiming: 'OPEN (7:00 AM – 12:00 PM & 2:00 PM – 8:00 PM)',
      holidayNote: 'Clinic remains open on Sundays and major public holidays.',
    },
    disclaimerText:
      'The information provided on this website is for general informational purposes and does not replace professional medical diagnosis, treatment or emergency care.',
  });
  console.log('✅ Clinic Settings seeded');

  // 2. Seed Users (Admin, Receptionist, Doctor, Patient)
  const adminPassword = await AuthService.hashPassword('Admin@DrQHKhan1958!');
  const staffPassword = await AuthService.hashPassword('Staff@DrQHKhan1958!');
  const docPassword = await AuthService.hashPassword('Doctor@DrQHKhan1958!');
  const patientPassword = await AuthService.hashPassword('Patient@123456');

  const adminUser = await User.create({
    email: 'admin@drqhkhanclinic.com',
    password: adminPassword,
    role: 'super_admin',
  });

  const receptionistUser = await User.create({
    email: 'staff@drqhkhanclinic.com',
    password: staffPassword,
    role: 'receptionist',
  });

  await ReceptionistProfile.create({
    name: 'Clinic Reception Desk',
    employeeId: 'STF-1001',
    phone: '9135404090',
    shift: 'General Shift (8:00 AM - 8:00 PM)',
    user: receptionistUser._id,
  });

  const activeDoctorUser = await User.create({
    email: 'drikhan@drqhkhanclinic.com',
    password: docPassword,
    role: 'doctor',
  });

  const demoPatientUser = await User.create({
    email: 'patient@example.com',
    password: patientPassword,
    role: 'patient',
  });

  // 3. Seed 3 Doctors (1 Legacy Founder, 2 Active Doctors)
  const doctorsData = [
    {
      slug: 'dr-q-h-khan',
      name: 'Late Dr. Q.H. Khan',
      degrees: ['B.H.M.S. (B.U.)', 'R.B.S.M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'Multi-Specialist & General Physician',
      designation: 'Founder (In Memoriam)',
      bio: 'Pioneer of classical homoeopathy in Gaya who established this clinic in 1958. His legacy and clinical standards continue to guide our active specialists.',
      image: '/images/dr-qh-khan.png',
      clinicSchedule: {
        days: [],
        morning: 'N/A',
        evening: 'N/A',
      },
      isDeceased: true,
      isActive: false,
    },
    {
      slug: 'dr-i-khan',
      name: 'Dr. I. Khan',
      degrees: ['B.H.M.S. (B.U.)', 'R.B.S. M.H.C.'],
      registrationNumber: 'Reg. 33454',
      specialization: 'General Physician & Chronic Disease Specialist',
      designation: 'Managing Director & General Physician',
      bio: 'Managing Director & General Physician with extensive experience in classical homoeopathy, specializing in chronic diseases, severe long-term illnesses, skin disorders, vitiligo, and private constitutional complaints.',
      image: '/images/dr-i-khan.png',
      clinicSchedule: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        morning: '8:00 AM – 12:00 PM',
        evening: '2:00 PM – 8:00 PM',
      },
      user: activeDoctorUser._id,
      isActive: true,
    },
    {
      slug: 'dr-adeeba-farheen',
      name: 'Dr. Adeeba Farheen',
      degrees: ['B.H.M.S. (B.U.)', 'M.D. (Physician)', 'G.D.M.C., Katihar, Patna'],
      registrationNumber: 'Reg. 31319',
      specialization: 'General Physician, Female Disorders (PCOD, Breast Lumps) & Normal Delivery Care',
      designation: 'Consultant Physician & Female Health Specialist',
      bio: 'General Physician and Female Healthcare consultant experienced in PCOD/PCOS, breast tumours/lumps, female health disorders, normal delivery consultation, and general medical conditions.',
      image: '/images/dr-adeeba-farheen.png',
      clinicSchedule: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        morning: '9:00 AM – 1:00 PM',
        evening: '3:00 PM – 7:00 PM',
      },
      isActive: true,
    },
  ];

  const createdDoctors = await DoctorProfile.insertMany(doctorsData);
  console.log(`✅ ${createdDoctors.length} Doctors seeded`);

  // 4. Seed Demo Patient
  const demoPatient = await Patient.create({
    patientId: 'HOSP-2026-1001',
    name: 'Rajesh Kumar',
    email: 'patient@example.com',
    phone: '9876543210',
    age: 38,
    gender: 'Male',
    bloodGroup: 'B+',
    address: 'AP Colony, Gaya, Bihar',
    primaryDoctor: createdDoctors[1]._id, // Maps to Dr. I. Khan
    registeredUser: demoPatientUser._id,
  });

  // 5. Seed Demo Appointment
  const demoAppointment = await Appointment.create({
    appointmentId: 'HOSP-APT-20260830-1001',
    name: 'Rajesh Kumar',
    email: 'patient@example.com',
    phone: '9876543210',
    age: 38,
    gender: 'Male',
    department: 'Skin & Dermatology',
    doctor: createdDoctors[1]._id, // Maps to Dr. I. Khan
    doctorName: 'Dr. I. Khan (Skin)',
    preferredDate: '2026-08-30',
    preferredTime: '10:00 AM',
    message: 'Consultation regarding chronic psoriasis patch on elbow.',
    consent: true,
    status: 'confirmed',
    patient: demoPatient._id,
  });

  // 6. Seed Demo Finalized Medical Report
  await Report.create({
    reportId: 'HOSP-REP-20260830-2001',
    patient: demoPatient._id,
    patientName: demoPatient.name,
    doctor: createdDoctors[1]._id, // Maps to Dr. I. Khan
    doctorName: createdDoctors[1].name,
    dateOfVisit: '2026-08-28',
    symptoms: ['Dry scaly skin patches', 'Itching on elbows', 'Mild redness'],
    diagnosis: 'Psoriasis Vulgaris (Extensor Surfaces)',
    vitals: {
      bloodPressure: '120/80 mmHg',
      pulseRate: 74,
      weightKg: 72,
      temperatureF: 98.6,
    },
    prescription: [
      {
        medicineName: 'Graphites 30C',
        dosage: '4 pills',
        timing: 'Morning & Evening (Before meals)',
        durationDays: 15,
        notes: 'Avoid spicy & oily foods during treatment.',
      },
      {
        medicineName: 'Sulphur 200C',
        dosage: '4 pills',
        timing: 'Weekly once on Sunday morning',
        durationDays: 30,
      },
    ],
    doctorNotes: 'Patient advised to keep skin hydrated. Follow-up after 15 days.',
    status: 'finalized',
    finalizedAt: new Date(),
  });

  // 7. Seed Sample Blogs
  await Blog.create([
    {
      title: 'Understanding Classical Homoeopathy: Principles and Holistic Care',
      slug: 'understanding-classical-homoeopathy-principles',
      excerpt: 'Explore how individualized constitutional remedies help support natural recovery in chronic ailments.',
      content:
        'Classical Homoeopathy, founded on the principle of "like cures like", addresses the whole person rather than just isolated symptoms. Since 1958, Dr. Q.H. Khan Clinic in Gaya has preserved constitutional prescribing standards.',
      author: 'Dr. Q.H. Khan',
      category: 'Homoeopathy Guidance',
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      title: 'Managing Skin Conditions Naturally: Psoriasis and Eczema Support',
      slug: 'managing-skin-conditions-naturally-psoriasis-eczema',
      excerpt: 'Key advice on diet, hydration, and homoeopathic evaluation for persistent dermatological symptoms.',
      content:
        'Skin complaints such as psoriasis, eczema, and leucoderma require careful constitutional assessment. Proper skin hydration and stress reduction play important complementary roles.',
      author: 'Dr. Adeeba Farheen',
      category: 'Dermatology & Skin Care',
      isPublished: true,
      publishedAt: new Date(),
    },
  ]);

  // 8. Seed Approved Feedback
  await Feedback.create([
    {
      patientName: 'Suresh P.',
      rating: 5,
      message: 'Very attentive care and genuine homoeopathic guidance from Dr. Q.H. Khan. High trust clinic in Gaya.',
      status: 'approved',
    },
    {
      patientName: 'Anjali Sharma',
      rating: 5,
      message: 'Clean clinic atmosphere and polite doctors. Dr. Adeeba Farheen explained skin treatment clearly.',
      status: 'approved',
    },
  ]);

  // 9. Seed Demo Camps (Shivir / Social Service)
  await Camp.create([
    {
      title: 'Free Medicine Distribution & Health Camp',
      description: 'Organized a free homeopathic health checkup and medicine distribution camp serving over 500 patients from underprivileged areas in Gaya. Focused on chronic skin issues and children health.',
      date: '15th August 2026',
      location: 'Nagmatia Road, Gaya, Bihar',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      isActive: true,
    },
    {
      title: 'Rural Homoeopathy Awareness & Healing Camp',
      description: 'Conducted a dedicated classical homeopathic camp in Bodh Gaya. Provided free consultations and distributed constitutional remedies for chronic disorders.',
      date: '20th July 2026',
      location: 'Bodh Gaya, Bihar, India',
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
      isActive: true,
    }
  ]);
  console.log('✅ Camps seeded');

  // 10. Seed Demo Videos
  await Video.create([
    {
      title: 'Patient Psoriasis Recovery Story - Success Testimonial',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'testimonial',
      description: 'A detailed video feedback from a patient sharing their recovery experience from severe psoriasis after 6 months of constitutional treatment.',
      isActive: true,
    },
    {
      title: 'Free Homoeopathic Medical Camp Highlights - Gaya 2026',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'camp',
      description: 'Video highlights from our community health checkup and free medicine camp organized at Nagmatia Road, Gaya.',
      isActive: true,
    }
  ]);
  console.log('✅ Videos seeded');

  console.log('🎉 Database Seeding Completed Successfully!');
  process.exit(0);
};

seedDatabase().catch((err) => {
  console.error('❌ Seeding Failed:', err);
  process.exit(1);
});
