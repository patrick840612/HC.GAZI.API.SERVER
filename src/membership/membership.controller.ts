import { Body, Controller, HttpStatus, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MemberSignUpDto } from './dto/memberSignUp.dto';
import { MembershipService } from './membership.service';

@Controller('membership')
export class MembershipController {
    private logger = new Logger('membershipController');
    constructor(private membershipService: MembershipService){}

    @Post('signUp')
    @UsePipes(ValidationPipe)
    async insertMember(@Body() memberSignUpDto: MemberSignUpDto ): Promise<any> {
        this.logger.log(`User trying to register Gazi with Ochoice from requestBody : ${JSON.stringify(memberSignUpDto)}`);
        try {
            const response = await this.membershipService.insertMember(memberSignUpDto);
            console.log('Response To AuthServer : ', response);
            return response;
        } catch (error) {
            console.error('Error during member insertion:', error);
            return {
                resultCode: HttpStatus.INTERNAL_SERVER_ERROR,
                resultMessage: 'Internal Server Error',
            };
        }
    }

}
