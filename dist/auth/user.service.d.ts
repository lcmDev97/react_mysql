import { Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { User } from "./entity/user.entity";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByNickname(nickname: string): Promise<UserDTO>;
    save(newUser: UserDTO): Promise<UserDTO | undefined>;
}
