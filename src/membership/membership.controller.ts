import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MemberSignUpDto } from './dto/memberSignUp.dto';
import { MembershipService } from './membership.service';

@Controller('membership')
export class MembershipController {
    private logger = new Logger('membershipController');
    constructor(private membershipService: MembershipService){}

    @Post('signUp')
    @UsePipes(ValidationPipe)
    insertMember(@Body() memberSignUpDto: MemberSignUpDto ): Promise<any> {
        this.logger.log(`User trying to register Gazi with Ochoice from requestBody : ${JSON.stringify(memberSignUpDto)}`);
        return this.membershipService.insertMember(memberSignUpDto);
    }

}
