import { EntityRepository, Repository } from "typeorm";
import { Member } from "./membership.entity";

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {

}