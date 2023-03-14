import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { User } from "./entity/user.entity";
import * as bcrypt from 'bcrypt'
import { UserAuthority } from "./entity/user-authority.entity";
import { RoleType } from "./role-type";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserAuthority) private userAuthority: Repository<UserAuthority>,
        private dataSource: DataSource,
        ) {}
        async saveAuthority(data) {
            return await this.userAuthority.save(data)
        }
        async findByNickname(nickname: string): Promise<UserDTO> {
            return await this.userRepository.findOne({where: {nickname}})
        }

        async encryptPssword(user: UserDTO): Promise<void> {
            user.password = await bcrypt.hash(user.password, Number(process.env.BCRYPT_SALT))
        }

        async save(newUser: UserDTO): Promise<UserDTO | undefined> {
            await this.encryptPssword(newUser)
            await this.userRepository.save(newUser)
            let foundUserId = await (await this.userRepository.findOne({where: {nickname: newUser.nickname}})).id
            return await this.saveAuthority({
                userId: foundUserId,
                authorityName: "ROLE_USER"
            })
        }

        async deleteUser(user: User): Promise<any>{
            return await this.userRepository.createQueryBuilder()
            .delete()
            .from(User, 'user')
            .where('id = :id', { id: user.id })
            .execute();
        }

        async deleteUserAuthorities(user: User): Promise<any>{
            return await this.userAuthority.createQueryBuilder()
            .delete()
            .from(UserAuthority, 'userAuthority')
            .where('userId = :userId', { userId: user.id })
            .execute();
        }

        async deleteUserTransaction(user: User): Promise<any>{
            // transaction 처리
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try{
                await this.deleteUser(user);
                await this.deleteUserAuthorities(user);
                await queryRunner.commitTransaction() //commit
            } catch (err) {
                await queryRunner.rollbackTransaction();//실패시 rollback
            } finally {
                await queryRunner.release(); //release
            }
        }
        
}