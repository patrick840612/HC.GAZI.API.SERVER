import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import * as config from 'config';
import { ExtractJwt, Strategy } from "passport-jwt";
import { FindOneOptions, Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){
        super({
            secretOrKey: config.get('jwt.secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {

        const{username} = payload;

        const options: FindOneOptions<User> = {
            where: { username },
        };

        const user: User = await this.userRepository.findOne(options);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}