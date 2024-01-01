import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// Enumerated type for Yes/No values
export enum YesNoEnum {
  YES = 'Y',
  NO = 'N',
}

@Entity({ name: 't_member' })
export class Member {
  @PrimaryGeneratedColumn()
  mem_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true, collation: 'utf8mb4_general_ci' })
  email: string;

  @Column({ type: 'varchar', length: 128, nullable: false, collation: 'utf8mb4_general_ci' })
  passwd: string;

  @Column({ type: 'varchar', length: 50, nullable: true, collation: 'utf8mb4_general_ci' })
  name: string;

  @Column({ type: 'varchar', length: 10, nullable: true, collation: 'utf8mb4_general_ci' })
  gender: string;

  @Column({ type: 'varchar', length: 50, nullable: true, collation: 'utf8mb4_general_ci' })
  phone: string;

  @Column({ type: 'varchar', length: 45, nullable: true, collation: 'utf8mb4_0900_ai_ci' })
  birthDate: string;

  @Column({ type: 'varchar', length: 100, nullable: true, collation: 'utf8mb4_0900_ai_ci' })
  ci: string;

  @Column({ type: 'varchar', length: 100, nullable: true, collation: 'utf8mb4_0900_ai_ci' })
  di: string;

  @Column({ type: 'varchar', length: 50, nullable: true, collation: 'utf8mb4_0900_ai_ci' })
  nick: string;

  @Column({ type: 'varchar', length: 100, nullable: true, collation: 'utf8mb4_general_ci' })
  photo: string;

  @Column({ type: 'varchar', length: 128, nullable: true, collation: 'utf8mb4_general_ci' })
  pick_area: string;

  @Column({ type: 'varchar', length: 50, nullable: true, collation: 'utf8mb4_general_ci' })
  view_area: string;

  @Column({ type: 'varchar', length: 255, nullable: true, collation: 'utf8mb4_general_ci' })
  app_token: string;

  @Column({ type: 'varchar', length: 10, nullable: true, collation: 'utf8mb4_0900_ai_ci' })
  app_ver: string;

  @Column({ type: 'varchar', length: 50, nullable: true, collation: 'utf8mb4_general_ci' })
  imp_uid: string;

  @Column()
  allow_email: YesNoEnum;

  @Column()
  allow_news: YesNoEnum;

  @Column()
  allow_event: YesNoEnum;

  @CreateDateColumn({ type: 'datetime'})
  join_date: Date;

  @UpdateDateColumn({ type: 'timestamp'})
  update_date: Date;

  @Column({ type: 'int', default: 0, nullable: true, comment: '로그인 실패 카운트' })
  login_fail_cnt: number;

  @Column({ type: 'varchar', length: 10, nullable: true, collation: 'utf8mb4_general_ci', comment: 'web/app 구분' })
  device: string;

  @Column({ type: 'varchar', length: 10, nullable: true, collation: 'utf8mb4_general_ci', comment: 'app인 경우 os 구분(ios/android)' })
  os: string;

  @Column({ type: 'varchar', length: 50, nullable: true, collation: 'utf8mb4_general_ci', comment: '간편로그인 sns' })
  sns: string;

  @Column({ type: 'varchar', length: 100, nullable: true, collation: 'utf8mb4_general_ci', comment: 'apple 아이디 로그인 해제(탈퇴)시 필요값' })
  refresh_token: string;

  @Column()
  staff_yn: YesNoEnum;

  @Column({ type: 'varchar', length: 10, nullable: true, collation: 'utf8mb4_general_ci' })
  sns_id: string;

  @Column({ type: 'varchar', length: 300, nullable: true, collation: 'utf8mb4_general_ci', comment: '앱카드 로그인 시 필요한 회원별 token값' })
  authToken: string;

  @Column({ type: 'json', nullable: true, comment: '자동로그인을 위한 UDID' })
  udid: any;

  @Column({ type: 'varchar', length: 45, nullable: true, unique: true, collation: 'utf8mb4_general_ci' })
  tmp_no: string;

  @Column({ type: 'datetime', nullable: true, default: null })
  login_date: Date;

  @Column({ type: 'datetime', nullable: true, default: null, comment: '비번 변경일자' })
  change_pw_date: Date;

  @Column({ type: 'datetime', nullable: true, default: null, comment: '알람 체크 일자' })
  alram_check_date: Date;

}