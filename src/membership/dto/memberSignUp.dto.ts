import { IsNotEmpty } from "class-validator";

export class MemberSignUpDto{

    @IsNotEmpty()
    encryptBody: string;

    @IsNotEmpty()
    agreeGaziMarketing: number;

}