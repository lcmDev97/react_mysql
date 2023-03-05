import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    registerNewUser(newUser: UserDTO): Promise<UserDTO>;
    validateUser(user: UserDTO): Promise<UserDTO>;
}
