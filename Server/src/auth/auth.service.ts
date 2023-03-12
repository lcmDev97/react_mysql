import { HttpException, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt'
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        ) {}

    async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
        const existedNickname = await this.userService.findByNickname(newUser.nickname)
        if(existedNickname) {
            throw new HttpException("이미 사용중인 닉네임 입니다.", 409)
        }
        return this.userService.save(newUser)
    }

    async validateUser(user: UserDTO): Promise<{accessToken: string}> {
        const foundUser = await this.userService.findByNickname(user.nickname)
        const comparePassword = await bcrypt.compare(user.password, foundUser.password)
        if(!foundUser || !comparePassword){
            throw new HttpException("아이디 또는 비밀번호를 확인해 주세요.", 400)
        }
        this.convertInAuthorities(foundUser)
        const payload: Payload = {
            id: foundUser.id,
            nickname: foundUser.nickname,
            authorities: foundUser.authorities
        }

        return {
            accessToken: this.jwtService.sign(payload)
        }
    }

    async tokenValidateUser(payload: Payload): Promise<UserDTO | undefined> {
        const FoundUser = await this.userService.findByNickname(payload.nickname);
        this.flatAuthorities(FoundUser)
        return FoundUser
    }
    
    private convertInAuthorities(user: any): User {
        if (user && user.authorities) {
            const authorities: any[] = [];
            user.authorities.forEach(authority => authorities.push({ name: authority.authorityName }));//푸쉬할떄, json값으로 push
            user.authorities = authorities;
        }
        return user;
    }

    private flatAuthorities(user: any): User {
        if (user && user.authorities) {
            const authorities: string[] = [];
            user.authorities.forEach(authority => authorities.push(authority.authorityName)); //이건 값만 push
            user.authorities = authorities;
        }
        return user;
    }

    
}