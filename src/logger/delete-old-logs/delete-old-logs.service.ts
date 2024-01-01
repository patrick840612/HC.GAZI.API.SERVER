import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DeleteOldLogsService {
  async deleteOldLogs(logsPath: string, retentionPeriodInDays: number) {
    try {
      const now = new Date();
      const retentionTimestamp = now.getTime() - retentionPeriodInDays * 24 * 60 * 60 * 1000;

      const files = fs.readdirSync(logsPath);

      for (const file of files) {
        const filePath = path.join(logsPath, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isFile() && fileStat.mtimeMs < retentionTimestamp) {
          fs.unlinkSync(filePath);
          console.log(`Deleted old log file: ${filePath}`);
        }
      }
    } catch (error) {
      console.error('Error deleting old logs:', error.message);
    }
  }
}