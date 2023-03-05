import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `now, ${process.env.SERVER_MODE} mode`;
  }
}
