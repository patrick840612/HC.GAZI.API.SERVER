import { Injectable, LogLevel, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { loggerConfig } from '../configs/logger.config';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger(loggerConfig);
  }

  log(message: string, context?: string): void {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string): void {
    this.logger.verbose(message, { context });
  }

  setLogLevel(level: LogLevel) {
    // LogLevel을 동적으로 변경할 수 있음
    this.logger.transports.forEach((transport) => {
      if (transport instanceof winston.transports.Console) {
        transport.level = level;
      }
    });
  }
}