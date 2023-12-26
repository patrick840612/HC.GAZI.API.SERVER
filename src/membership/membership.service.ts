import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberStatus } from './membership-status.enum';
import { v1 as uuid } from 'uuid';
import { InsertMemberDto } from './dto/insert-member.dto';
import { MemberRepository } from './membership.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './membership.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class MembershipService {
    constructor(
        @InjectRepository(MemberRepository)
        private memberRepository: MemberRepository
    ){}

    // private memberships: Membership[] = [];

    // mem: Membership;
    // constructor() {
    //     this.mem = {
    //         id: "e7712ea0-9ef3-11ee-98be-93ee28056396",
    //         member_id: "leekoon11",
    //         password: "skdjfoisdkjgiksdjgikdsjgkd",
    //         ci: "djoisjgviksdjgvkosjjbvkosdjklbmsdnlbnksdfnbkldfsnbkldfnbkdfn=="
    //         , status: MemberStatus.TRUE
    //     };
    //     this.memberships.push(this.mem);
    // }

    // selectAllMember(): Membership[] {
    //     return this.memberships;
    // }

    // insertMember(insertMemberDto: InsertMemberDto) {
    //     const { member_id, password, ci} = insertMemberDto;

    //     const membership: Membership = {
    //         id: uuid(),
    //         member_id,
    //         password,
    //         ci,
    //         status: MemberStatus.TRUE
    //     }

    //     this.memberships.push(membership);
    //     return membership;
    // }

    async insertMember(insertMemberDto: InsertMemberDto): Promise<Member> {
        const {member_id, password, ci} = insertMemberDto;
        console.log(insertMemberDto);
        const member = this.memberRepository.create({
            member_id,
            password,
            ci 
            // status
        });
console.log(member);
        await this.memberRepository.save(member);
        return member;
    }

    async getMemberById(id: number): Promise<Member> {
        const options: FindOneOptions<Member> = {
            where: { id },
        };

        const found = await this.memberRepository.findOne(options);

        if(!found){
            throw new NotFoundException(`Can't find Member with id ${id}`);
        }

        return found;
    }

    // selectMemberByCi(ci: string): Membership {
    //     const found = this.memberships.find((membership) => membership.ci === ci);

    //     if(!found) {
    //         throw new NotFoundException(`Can't find Member with ci ${ci}`);
    //     }

    //     return found;
    // }

    // deleteMember(ci: string): void {
    //     const found = this.selectMemberByCi(ci);
    //     this.memberships = this.memberships.filter((membership) => membership.ci === found.ci);
    // }

    // updateMember(ci: string, password: string): Membership {
    //     const member = this.selectMemberByCi(ci);
    //     member.password = password;
    //     return member;
    // }

    // updateMemberStatus(ci: string, status: MemberStatus): Membership {
    //     const member = this.selectMemberByCi(ci);
    //     member.status = status;
    //     return member;
    // }
}
