import { Schema, model, Document, Types } from 'mongoose';

export interface IReceptionistProfileDocument extends Document {
  name: string;
  employeeId: string;
  phone: string;
  shift: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const receptionistProfileSchema = new Schema<IReceptionistProfileDocument>(
  {
    name: { type: String, required: true, trim: true },
    employeeId: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true },
    shift: { type: String, default: 'General Shift' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const ReceptionistProfile = model<IReceptionistProfileDocument>(
  'ReceptionistProfile',
  receptionistProfileSchema
);
