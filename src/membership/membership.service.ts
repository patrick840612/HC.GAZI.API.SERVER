import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as config from 'config';
import { FindOneOptions, Repository } from 'typeorm';
import { MemberSignUpDto } from './dto/memberSignUp.dto';
import { Member, YesNoEnum } from './membership.entity';
import { AES_256_ECB } from './util/AES_256_ECB';
import axios from 'axios';
import { RequestService } from './request.service';

@Injectable()
export class MembershipService {
    private logger = new Logger('membershipService');

    constructor(
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,

        private requestService: RequestService
    ){}


    // 가지 t_member 테이블에 가입정보 입력
    async insertMember(memberSignUpDto: MemberSignUpDto): Promise<any> {

        const agreeGaziMarketing = memberSignUpDto.agreeGaziMarketing;
        const encryptBody = memberSignUpDto.encryptBody;

        const aes256ecbConfig = config.get('aes256ecb');

        // 복호화 유틸 생성
        const aesCipher = new AES_256_ECB(aes256ecbConfig.secretKey);

        try {
            // encryptBody 복호화
            const decryptedData = aesCipher.dec_aes(encryptBody);

            // JSON 파싱
            const parsedData = JSON.parse(decryptedData);
            this.logger.log(`User ${parsedData.member_id} trying to Select_DB From t_member Table By ci : ${parsedData.ci}`);

            // ci로 가입정보 찾기
            const memberByCi = await this.getMemberByCi(parsedData.ci);
            if(memberByCi == null){
                this.logger.warn(`User Selected DB Data : ${JSON.stringify(memberByCi)}`);
            }else{
                this.logger.log(`User Selected DB Data : ${JSON.stringify(memberByCi)}`);
            }
            

            // 가입이력이 있으면 sns컬럼을 ochoice로 변경
            if(memberByCi){

                memberByCi.sns = 'ochoice';
                memberByCi.allow_email = agreeGaziMarketing == 1 ? YesNoEnum.YES : YesNoEnum.NO,
                memberByCi.allow_news = agreeGaziMarketing == 1 ? YesNoEnum.YES : YesNoEnum.NO,
                memberByCi.allow_event = agreeGaziMarketing == 1 ? YesNoEnum.YES : YesNoEnum.NO,
                await this.memberRepository.save(memberByCi);
                this.logger.log(`User ${memberByCi.email} Updated Data sns column to : ${memberByCi.sns}, 마케팅 수신 여부`);
                return {
                    resultCode: HttpStatus.OK,
                    resultMessage: '가지 가입 정보가 수정되었습니다',
                };

            // 가입이력이 없으면 회원가입
            }else{

                // 엔티티로의 매핑
                const memberEntity = this.memberRepository.create({
                    email : parsedData.member_id,
                    passwd : parsedData.password,
                    name : parsedData.user_name,
                    gender : parsedData.gender === 0 ? 'male' : 'female',
                    phone : parsedData.tel,
                    ci : parsedData.ci,
                    di : parsedData.di,
                    allow_email : agreeGaziMarketing == 1 ? YesNoEnum.YES : YesNoEnum.NO,
                    allow_news : agreeGaziMarketing == 1 ? YesNoEnum.YES : YesNoEnum.NO,
                    allow_event : agreeGaziMarketing == 1 ? YesNoEnum.YES : YesNoEnum.NO,
                    staff_yn: YesNoEnum.NO,
                    sns : 'ochoice',
                });

                // TypeORM을 사용하여 엔티티 저장
                await this.memberRepository.save(memberEntity);
                this.logger.log(`In case Selected DB_Data is null, Insert Data: ${JSON.stringify(memberEntity)}`);

                // 가입이 성공하면 토큰 값을 가져와 문자를 보내는 함수 호출
                // const token = await this.requestService.requestSend();

                return {
                    resultCode: HttpStatus.OK,
                    resultMessage: '가지 가입이 완료되었습니다',
                };

            }


        } catch (error) {
            this.logger.error(`During the database insertion process is Failed Error message: ${error.message}`);
            // 가입 실패
            throw new HttpException('가지 가입 정보 입력 중 오류가 발생했습니다.', HttpStatus.BAD_REQUEST);
        }
    }

    // ci로 기존 가입자 확인
    async getMemberByCi(ci: any): Promise<Member> {

        const options: FindOneOptions<Member> = {
            where: { ci },
        };

        const found = await this.memberRepository.findOne(options);

        return found;
    }

}
