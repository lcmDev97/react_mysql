import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Payload } from "./payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET_KEY,
        })
    }

    async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
        const foundUser = await this.authService.tokenValidateUser(payload);
        if (!foundUser) {
            throw new HttpException("올바르지 않은 권한입니다. 재 로그인후 다시 시도해주세요.", 401)
        };
        return done(null, foundUser);
    }

}