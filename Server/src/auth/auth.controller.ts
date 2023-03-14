import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Roles } from './decorator/role.decorator';
import { UserDTO } from './dto/user.dto';
import { RoleType } from './role-type';
import { AuthGuard } from './security/auth.guard';
import { RolesGuard } from './security/roles.guard';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
        ) {}

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
            accessToken: jwt.accessToken,
            message: "success"
        })
    }

    @Get('/testauth')
    @UseGuards(AuthGuard)
    isAuthenticated(@Req() req: Request): any { 
        console.log("req.user정보",req.user)
        const user: any = req.user;
        return "loginState: ture";
    }
    
    @Get('/cookie')
    getCookie(@Req() req: Request, @Res() res: Response): any {
        const jwtInCookie = req.cookies['jwt']
        return res.json(jwtInCookie)
    }

    @Get('/logout')
    logout(@Res() res: Response): any {
        res.cookie('jwt', '', {
            maxAge: 0
        })
        res.cookie('isLogin', '', {
            maxAge: 0
        })
        return res.json({
            success: true,
            message: "로그아웃 하였습니다."
        })
    }

    @Get('/admin-role')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    adminRole(@Req() req: Request): any {
        const user: any = req.user;
        return user;
    }

    @Delete('/user')
    @UseGuards(AuthGuard)
    async deleteUser(@Req() req: Request): Promise<any> {
        const user: any = req.user;
        return await this.userService.deleteUserTransaction(user)
    }

}