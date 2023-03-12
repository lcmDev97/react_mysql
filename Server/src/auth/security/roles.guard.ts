import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate { //"CanActivate는 사용가능한지 여부를 묻는거죠"
    constructor(private readonly reflector: Reflector) {} // Reflector가 아까 얘기했던, 런타임시의 메타데이터를 가져올 수 있게 하는 구현체같은거.(내생각: 이걸로 메타데이터 받아오는듯) 

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as User;

        return user && user.authorities && user.authorities.some(role => roles.includes(role));
    }
}