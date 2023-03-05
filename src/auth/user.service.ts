import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { User } from "./entity/user.entity";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>) {}

        async findByNickname(nickname: string): Promise<UserDTO> {
            return await this.userRepository.findOne({where: {nickname}})
        }

        async encryptPssword(user: UserDTO): Promise<void> {
            user.password = await bcrypt.hash(user.password, Number(process.env.BCRYPT_SALT))
        }

        async save(newUser: UserDTO): Promise<UserDTO | undefined> {
            await this.encryptPssword(newUser)
            return await this.userRepository.save(newUser)
        }

}