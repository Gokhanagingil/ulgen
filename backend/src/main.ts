import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TenantInterceptor } from './tenant.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  console.log('JWT_SECRET:', configService.get<string>('JWT_SECRET'));
  app.useGlobalInterceptors(new TenantInterceptor(), app.get(LoggingInterceptor));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ origin: 'http://localhost:5173', credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Gokhan API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
