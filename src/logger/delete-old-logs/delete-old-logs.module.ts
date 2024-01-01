import { Module } from '@nestjs/common';
import { DeleteOldLogsService } from './delete-old-logs.service';

@Module({
  providers: [DeleteOldLogsService],
  exports: [DeleteOldLogsService],
})
export class DeleteOldLogsModule {}
