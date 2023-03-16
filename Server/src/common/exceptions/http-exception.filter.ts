import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();   //<= 실행환경(context)에 대한 설정
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message
    if(status === 404) {
        message = "404 ERROR :("
    } else {
        message = exception.getResponse()
    }

    response.status(status)
      .json({
        success: false,
        data: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message
        }
      });
  }
}
