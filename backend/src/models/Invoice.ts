import { Schema, model, Document, Types } from 'mongoose';

export interface IInvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface IInvoiceDocument extends Document {
  invoiceId: string;
  patient: Types.ObjectId;
  patientName: string;
  date: string;
  items: IInvoiceItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentStatus: 'paid' | 'unpaid' | 'partially_paid';
  paymentMethod: 'cash' | 'upi' | 'card' | 'none';
  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new Schema<IInvoiceDocument>(
  {
    invoiceId: { type: String, required: true, unique: true, index: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    patientName: { type: String, required: true },
    date: { type: String, required: true },
    items: [
      {
        description: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, required: true, default: 0 },
    finalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid', 'partially_paid'],
      default: 'unpaid',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'upi', 'card', 'none'],
      default: 'none',
    },
  },
  { timestamps: true }
);

export const Invoice = model<IInvoiceDocument>('Invoice', invoiceSchema);
