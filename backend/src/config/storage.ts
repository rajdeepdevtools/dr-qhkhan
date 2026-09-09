import fs from 'fs';
import path from 'path';
import { ENV } from './env';

export interface StorageProvider {
  uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string>;
  getFileUrl(fileKey: string): Promise<string>;
}

class LocalStorageProvider implements StorageProvider {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.resolve(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
    const uniqueKey = `${Date.now()}-${fileName.replace(/\s+/g, '_')}`;
    const filePath = path.join(this.uploadDir, uniqueKey);
    await fs.promises.writeFile(filePath, fileBuffer);
    return uniqueKey;
  }

  async getFileUrl(fileKey: string): Promise<string> {
    return `/uploads/${fileKey}`;
  }
}

export const getStorageProvider = (): StorageProvider => {
  if (ENV.STORAGE_PROVIDER === 's3') {
    // Return AWS S3 provider implementation if configured
  }
  return new LocalStorageProvider();
};
