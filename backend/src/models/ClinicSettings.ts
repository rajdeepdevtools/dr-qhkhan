import { Schema, model, Document } from 'mongoose';

export interface IClinicSettingsDocument extends Document {
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

const clinicSettingsSchema = new Schema<IClinicSettingsDocument>(
  {
    clinicName: { type: String, required: true, default: 'DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC' },
    establishedYear: { type: Number, required: true, default: 1958 },
    address: { type: String, required: true, default: 'Nagmatia Road, Gaya, Bihar, India' },
    helplines: [{ type: String, default: ['9709786669', '9135404090', '9097211989'] }],
    whatsappNumber: { type: String, required: true, default: '9135404090' },
    timings: {
      weekdayMorning: { type: String, default: '8:00 AM – 12:00 PM' },
      weekdayEvening: { type: String, default: '2:00 PM – 8:00 PM' },
      sundayTiming: { type: String, default: 'OPEN (7:00 AM – 12:00 PM & 2:00 PM – 8:00 PM)' },
      holidayNote: { type: String, default: 'Open on major holidays unless announced.' },
    },
    disclaimerText: {
      type: String,
      default:
        'The information provided on this website is for general informational purposes and does not replace professional medical diagnosis, treatment or emergency care.',
    },
  },
  { timestamps: true }
);

export const ClinicSettings = model<IClinicSettingsDocument>('ClinicSettings', clinicSettingsSchema);
