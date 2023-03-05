import { HttpException, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
        const existedNickname = await this.userService.findByNickname(newUser.nickname)
        if(existedNickname) {
            throw new HttpException("이미 사용중인 닉네임 입니다.", 409)
        }
        return this.userService.save(newUser)
    }

    async validateUser(user: UserDTO): Promise<string> {
        const foundUser = await this.userService.findByNickname(user.nickname)
        const comparePassword = await bcrypt.compare(user.password, foundUser.password)
        if(!foundUser || !comparePassword){
            throw new HttpException("아이디 또는 비밀번호를 확인해 주세요.", 400)
        }
        return "Login Success"
    }

}