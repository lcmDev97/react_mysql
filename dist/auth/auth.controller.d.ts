import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerNewUser(newUser: UserDTO): Promise<any>;
    login(user: UserDTO): Promise<any>;
}
