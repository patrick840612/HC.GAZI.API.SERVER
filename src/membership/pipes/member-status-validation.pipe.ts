import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { MemberStatus } from "../membership-status.enum";

export class MemberStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        MemberStatus.TRUE,
        MemberStatus.FALSE
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`);
        }
        
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}