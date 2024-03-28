import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@/filters/httpException.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const reflector = app.get(Reflector);

  const configService = app.get(ConfigService);

  const serverConfig = configService.get('server');

  app.use(cors());

  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory(errors) {
        const messages = errors.map((err) => {
          let msg: string = '';
          if (err.constraints) {
            msg = Object.values(err.constraints).join(',');
          }
          return msg;
        });
        return new HttpException('参数错误', 400, {
          description: messages.join(';'),
        });
      },
    }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle('xxx')
    .setDescription('xxx接口文档')
    .setVersion('1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(serverConfig.port);
}
bootstrap();
