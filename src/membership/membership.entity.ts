import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MemberStatus } from "./membership-status.enum";
import { table } from "console";

@Entity({ name: 'member' })
export class Member extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    member_id: string;

    @Column()
    password: string;

    @Column()
    ci: string;

    // @Column()
    // status: MemberStatus;
}