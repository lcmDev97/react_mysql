import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true
  })
  app.use(cookieParser())
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
