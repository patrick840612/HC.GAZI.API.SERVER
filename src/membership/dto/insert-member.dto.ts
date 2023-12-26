import { IsNotEmpty } from "class-validator";
import { MemberStatus } from "../membership-status.enum";

export class InsertMemberDto{

    @IsNotEmpty()
    member_id: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    ci: string;    

    // status: MemberStatus;
}