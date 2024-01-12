import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomHttpExceptionFilter } from './exception/custom_Exception';
import { MembershipController } from './membership.controller';
import { Member } from './membership.entity';
import { MembershipService } from './membership.service';
import { RequestService } from './request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member])
  ],
  controllers: [MembershipController],
  providers: [
    MembershipService, RequestService,
    {
    provide: APP_FILTER,
    useClass: CustomHttpExceptionFilter,
    },
  ],
})
export class MembershipModule {}
