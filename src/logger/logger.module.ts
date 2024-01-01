import { Module } from '@nestjs/common';
import { DeleteOldLogsModule } from './delete-old-logs/delete-old-logs.module';
import { LoggerService } from './logger.service';
import { ScheduleDeleteOldLogsModule } from './schedule-delete-old-logs/schedule-delete-old-logs.module';

@Module({
  providers: [LoggerService],
  imports: [DeleteOldLogsModule, ScheduleDeleteOldLogsModule]
})
export class LoggerModule {}
