import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TenantInterceptor } from '../src/tenant.interceptor';
import { AuthModule } from '../src/auth/auth.module';
import { TenantModule } from '../src/tenant/tenant.module';
import { TodoModule } from '../src/todo/todo.module';
import { Tenant } from '../src/entities/tenant.entity';
import { User } from '../src/entities/user.entity';
import { Todo } from '../src/entities/todo.entity';

export async function createTestApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' }),
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [Tenant, User, Todo],
        synchronize: true,
      }),
      AuthModule,
      TenantModule,
      TodoModule,
    ],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new TenantInterceptor());
  await app.init();
  return app;
}
