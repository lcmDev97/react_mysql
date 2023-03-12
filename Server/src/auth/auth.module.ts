import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { config }  from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { UserAuthority } from './entity/user-authority.entity';
config()

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAuthority]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '10h' },
    }),
    PassportModule,
],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule {}
