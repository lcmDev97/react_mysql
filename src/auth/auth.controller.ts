import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
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
    async login(@Body() user: UserDTO, @Res() res: Response): Promise<any>{
        const jwt = await this.authService.validateUser(user)
        res.setHeader('Authorization', `Bearer ${jwt.accessToken}`)
        return res.json(jwt)
    }

    @Get('/testauth')
    @UseGuards(AuthGuard('jwt'))
    isAuthenticated(@Req() req: Request): any { 
        const user: any = req.user;
        return user;
    }
    

}