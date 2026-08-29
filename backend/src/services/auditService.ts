import { AuditLog } from '../models/AuditLog';
import { UserRole } from '@hospital/shared-types';
import { Types } from 'mongoose';

export class AuditService {
  static async logAction(params: {
    actorId: string;
    actorEmail: string;
    actorRole: UserRole;
    action: string;
    resourceType: string;
    resourceId?: string;
    details?: string;
    ipAddress?: string;
  }) {
    try {
      await AuditLog.create({
        actor: new Types.ObjectId(params.actorId),
        actorEmail: params.actorEmail,
        actorRole: params.actorRole,
        action: params.action,
        resourceType: params.resourceType,
        resourceId: params.resourceId,
        details: params.details,
        ipAddress: params.ipAddress,
        timestamp: new Date(),
      });
    } catch (err) {
      console.error('Failed to write audit log:', err);
    }
  }
}
