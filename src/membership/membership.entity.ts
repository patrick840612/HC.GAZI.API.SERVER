import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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