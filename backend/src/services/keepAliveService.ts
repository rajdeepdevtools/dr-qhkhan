import http from 'http';
import https from 'https';
import { ENV } from '../config/env';

let keepAliveIntervalId: NodeJS.Timeout | null = null;

/**
 * Performs a single HTTP/HTTPS GET ping request to the target health URL
 */
export const pingServer = (targetUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      const parsedUrl = new URL(targetUrl);
      const client = parsedUrl.protocol === 'https:' ? https : http;

      const req = client.get(targetUrl, { timeout: 10000 }, (res) => {
        const isSuccess = res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode < 400;
        if (isSuccess) {
          console.log(`[KeepAlive] Ping successful (${res.statusCode}) -> ${targetUrl} at ${new Date().toISOString()}`);
        } else {
          console.warn(`[KeepAlive] Ping received non-2xx status (${res.statusCode}) -> ${targetUrl}`);
        }
        // Consume response data to free up memory
        res.resume();
        resolve(isSuccess);
      });

      req.on('error', (err) => {
        console.error(`[KeepAlive] Ping failed for ${targetUrl}:`, err.message);
        resolve(false);
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn(`[KeepAlive] Ping timed out for ${targetUrl}`);
        resolve(false);
      });
    } catch (err: any) {
      console.error(`[KeepAlive] Invalid target URL "${targetUrl}":`, err.message);
      resolve(false);
    }
  });
};

/**
 * Resolves the appropriate keep-alive target ping URL based on environment settings
 */
export const getKeepAliveTargetUrl = (): string => {
  if (ENV.KEEP_ALIVE_URL && ENV.KEEP_ALIVE_URL.trim() !== '') {
    return ENV.KEEP_ALIVE_URL.trim();
  }

  if (ENV.NODE_ENV === 'production' && ENV.PROD_API_URL) {
    const baseUrl = ENV.PROD_API_URL.replace(/\/api\/?$/, '');
    return `${baseUrl}/health/ping`;
  }

  const port = parseInt(ENV.PORT, 10) || 5000;
  return `http://localhost:${port}/health/ping`;
};

/**
 * Starts the periodic keep-alive background ping service to prevent server dormancy/sleep
 */
export const startKeepAliveService = (): void => {
  if (!ENV.KEEP_ALIVE_ENABLED) {
    console.log('[KeepAlive] Service disabled via configuration (KEEP_ALIVE_ENABLED=false)');
    return;
  }

  if (keepAliveIntervalId) {
    console.log('[KeepAlive] Service is already running');
    return;
  }

  const targetUrl = getKeepAliveTargetUrl();
  const intervalMs = Math.max(1, ENV.KEEP_ALIVE_INTERVAL_MINUTES) * 60 * 1000;

  console.log(`[KeepAlive] Starting service. Target: ${targetUrl} | Interval: ${ENV.KEEP_ALIVE_INTERVAL_MINUTES} minutes`);

  // Perform an initial ping shortly after server startup (after 10 seconds)
  setTimeout(() => {
    pingServer(targetUrl);
  }, 10000);

  // Set up periodic interval
  keepAliveIntervalId = setInterval(() => {
    pingServer(targetUrl);
  }, intervalMs);
};

/**
 * Stops the keep-alive background ping service
 */
export const stopKeepAliveService = (): void => {
  if (keepAliveIntervalId) {
    clearInterval(keepAliveIntervalId);
    keepAliveIntervalId = null;
    console.log('[KeepAlive] Service stopped');
  }
};
