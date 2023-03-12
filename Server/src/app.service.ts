import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(@Res() res: Response): any {
    return `now, ${process.env.SERVER_MODE} mode`
  }
}