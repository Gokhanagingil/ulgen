import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Tenant } from './src/entities/tenant.entity';
import { User } from './src/entities/user.entity';
import { Todo } from './src/entities/todo.entity';
import { Role } from './src/entities/role.entity';
import { Log } from './src/entities/log.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Tenant, User, Todo, Role, Log],
  migrations: ['src/migrations/*.ts'],
});
