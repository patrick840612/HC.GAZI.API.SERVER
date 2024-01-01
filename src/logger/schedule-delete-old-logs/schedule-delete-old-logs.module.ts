import { Module } from '@nestjs/common';
import { DeleteOldLogsModule } from '../delete-old-logs/delete-old-logs.module';
import { DeleteOldLogsService } from '../delete-old-logs/delete-old-logs.service';
import { ScheduleDeleteOldLogsService } from './schedule-delete-old-logs.service';

@Module({
  imports: [DeleteOldLogsModule],
  providers: [ScheduleDeleteOldLogsService, DeleteOldLogsService],
  exports: [ScheduleDeleteOldLogsService],
})
export class ScheduleDeleteOldLogsModule {}
