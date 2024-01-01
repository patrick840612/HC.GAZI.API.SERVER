import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { LoggerModule } from './logger/logger.module';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    MembershipModule,
    LoggerModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
