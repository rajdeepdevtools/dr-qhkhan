import { Schema, model, Document, Types } from 'mongoose';
import { UserRole } from '@hospital/shared-types';

export interface IAuditLogDocument extends Document {
  actor: Types.ObjectId;
  actorEmail: string;
  actorRole: UserRole;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  timestamp: Date;
}

const auditLogSchema = new Schema<IAuditLogDocument>(
  {
    actor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actorEmail: { type: String, required: true },
    actorRole: { type: String, required: true },
    action: { type: String, required: true, index: true },
    resourceType: { type: String, required: true },
    resourceId: { type: String },
    details: { type: String },
    ipAddress: { type: String },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export const AuditLog = model<IAuditLogDocument>('AuditLog', auditLogSchema);
