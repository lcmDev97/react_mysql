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
        console.log('서버 body값 정보',user)
        const jwt = await this.authService.validateUser(user)
        // res.setHeader('Authorization', `Bearer ${jwt.accessToken}`)
        res.cookie('jwt', jwt.accessToken, {
            httpOnly: true,
            maxAge: 10 * 60 * 60 * 1000
        })
        return res.json({
            message: 'success'
        })
    }

    @Get('/testauth')
    @UseGuards(AuthGuard('jwt'))
    isAuthenticated(@Req() req: Request): any { 
        const user: any = req.user;
        return user;
    }
    
    @Get('/cookie')
    getCookie(@Req() req: Request, @Res() res: Response): any {
        const jwtInCookie = req.cookies['jwt']
        return res.json(jwtInCookie)
    }

    @Post('/logout')
    logout(@Res() res: Response): any {
        res.cookie('jwt', '', {
            maxAge: 0
        })
        return res.json({
            message: 'Successfully Logout.'
        })
    }

}