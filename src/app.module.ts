import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { LoggerService } from './logger.service';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    MembershipModule
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {}
