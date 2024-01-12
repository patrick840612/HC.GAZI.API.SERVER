import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DeleteOldLogsService } from '../delete-old-logs/delete-old-logs.service'; // 실제 경로에 맞게 수정

@Injectable()
export class ScheduleDeleteOldLogsService implements OnApplicationBootstrap {
  constructor(private readonly deleteOldLogsService: DeleteOldLogsService) {}

  onApplicationBootstrap() {
    // this.deleteOldLogs(); // 애플리케이션이 시작될 때 한 번 실행
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteOldLogs() {
    const logsPath = 'logs'; // 실제 로그 디렉토리 경로
    const retentionPeriodInDays = 180; // ~일 이전의 로그를 유지

    await this.deleteOldLogsService.deleteOldLogs(logsPath, retentionPeriodInDays);
  }
}