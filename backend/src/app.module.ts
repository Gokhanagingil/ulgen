import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Tenant } from './entities/tenant.entity';
import { User } from './entities/user.entity';
import { Todo } from './entities/todo.entity';
import { Role } from './entities/role.entity';
import { Log } from './entities/log.entity';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';
import { AdminModule } from './admin/admin.module';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Tenant, User, Todo, Role, Log],
      migrations: ['dist/src/migrations/*.js'],
      synchronize: false,
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([Tenant, User, Todo, Role, Log]),
    AuthModule,
    TenantModule,
    TodoModule,
    AdminModule,
  ],
  providers: [LoggingInterceptor],
})
export class AppModule {}
