import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { User } from "./entity/user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>) {}

        async findByNickname(nickname: string): Promise<UserDTO> {
            return await this.userRepository.findOne({where: {nickname}})
        }

        async save(newUser: UserDTO): Promise<UserDTO | undefined> {
            return await this.userRepository.save(newUser)
        }
}