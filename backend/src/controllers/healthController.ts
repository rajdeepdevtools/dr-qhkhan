import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ENV } from '../config/env';

export class HealthController {
  /**
   * Detailed health check endpoint
   * Returns system health status, DB connectivity, process uptime, and memory usage.
   */
  static async getHealth(req: Request, res: Response): Promise<void> {
    const dbStateMap: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    const readyState = mongoose.connection.readyState;
    const dbStatus = dbStateMap[readyState] || 'unknown';
    const isDbHealthy = readyState === 1;

    const memoryUsage = process.memoryUsage();
    const formattedMemory = {
      rssMB: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
      heapTotalMB: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
      heapUsedMB: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
    };

    const overallStatus = isDbHealthy ? 'UP' : 'DEGRADED';

    res.status(isDbHealthy ? 200 : 503).json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      environment: ENV.NODE_ENV,
      services: {
        database: {
          status: dbStatus,
          readyState,
        },
      },
      system: {
        memory: formattedMemory,
      },
    });
  }

  /**
   * Lightweight ping endpoint for keep-alive monitoring and health checks
   */
  static async ping(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      status: 'OK',
      ping: 'pong',
      timestamp: new Date().toISOString(),
    });
  }
}
