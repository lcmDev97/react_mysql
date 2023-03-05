import { Body, Controller, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    async registerNewUser(@Body() newUser: UserDTO): Promise<any> {
        return await this.authService.registerNewUser(newUser)
    }

    @Post('/login')
    async login(@Body() user: UserDTO): Promise<any>{
        return await this.authService.validateUser(user)
    }
    
}