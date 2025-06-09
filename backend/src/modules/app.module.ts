import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './to_do/todo.module';
import { TodoEntity } from './to_do/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: String(config.get('DB_HOST')),
        port: parseInt(String(config.get('DB_PORT') ?? '5432'), 10),
        username: String(config.get('DB_USERNAME')),
        password: String(config.get('DB_PASSWORD')),
        database: String(config.get('DB_NAME')),
        entities: [TodoEntity],
        synchronize: true,
      }),
    }),
    TodoModule,
  ],
})
export class AppModule {}
