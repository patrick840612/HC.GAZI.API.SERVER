import { Module } from '@nestjs/common';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from './membership.repository';
import { Member } from './membership.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberRepository])
  ],
  controllers: [MembershipController],
  providers: [MembershipService]
})
export class MembershipModule {}
