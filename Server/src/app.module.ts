import { config }  from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { UserAuthority } from './auth/entity/user-authority.entity';
config()

let syncBoolean = process.env.SERVER_MODE === 'dev' ? true : false
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, UserAuthority],
      synchronize: false, //!user_authority tabble에 기본 데이터 넣어져있으므로,개발단계에세도 false로 두기.
      logging: false, // DB관련없는 작업의 log찍기위해 잠시 꺼둠. syncBoolean
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}