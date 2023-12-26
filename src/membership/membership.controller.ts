import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MemberStatus } from './membership-status.enum';
import { InsertMemberDto } from './dto/insert-member.dto';
import { MemberStatusValidationPipe } from './pipes/member-status-validation.pipe';
import { Member } from './membership.entity';

@Controller('membership')
export class MembershipController {
    constructor(private membershipService: MembershipService){}

    // @Get('/')
    // selectAllMember(): Membership[] {
    //     return this.membershipService.selectAllMember();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // insertMemberDto(
    //     @Body() insertMemberDto: InsertMemberDto
    // ): Membership {
    //     return this.membershipService.insertMember(insertMemberDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    InsertMemberDto(@Body() insertMemberDto: InsertMemberDto): Promise<Member> {
        return this.membershipService.insertMember(insertMemberDto);
    }


    @Get('/:id')
    getMemberById(@Param('id') id:number): Promise<Member> {
        return this.membershipService.getMemberById(id);
    }

    // @Get('/:ci')
    // selectMemberByCi(@Param('ci') ci: string): Membership {
    //     return this.membershipService.selectMemberByCi(ci);
    // }

    // @Delete('/:ci')
    // deleteMember(@Param('ci') ci: string): void {
    //     this.membershipService.deleteMember(ci);
    // }

    // @Patch('/:ci')
    // updateMember(
    //     @Param('ci') ci: string,
    //     @Body('password') password: string
    // ) {
    //     return this.membershipService.updateMember(ci, password);
    // }


    // @Patch('/:ci/status')
    // updateMemberStatus(
    //     @Param('ci') ci: string,
    //     @Body('status', MemberStatusValidationPipe) status: MemberStatus
    // ) {
    //     return this.membershipService.updateMemberStatus(ci, status);
    // }
}
