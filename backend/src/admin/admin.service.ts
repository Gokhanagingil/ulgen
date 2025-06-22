import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Log } from '../entities/log.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Role) private readonly roles: Repository<Role>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Log) private readonly logs: Repository<Log>,
  ) {}

  createTable(name: string) {
    return { message: `Table ${name} created (simulated)` };
  }

  addField(table: string, field: string) {
    return { message: `Field ${field} added to ${table} (simulated)` };
  }

  createRelation(info: any) {
    return { message: `Relation created`, info };
  }

  async createRole(name: string) {
    const role = this.roles.create({ name });
    return this.roles.save(role);
  }

  async assignRole(userId: number, roleName: string) {
    const user = await this.users.findOne({ where: { id: userId } });
    const role = await this.roles.findOne({ where: { name: roleName } });
    if (user && role) {
      user.roles = user.roles ? [...user.roles, role] : [role];
      await this.users.save(user);
    }
    return user;
  }

  async getConfig() {
    return {
      appPort: process.env.APP_PORT || 'unknown',
      nodeEnv: process.env.NODE_ENV,
      database: process.env.DATABASE_NAME || 'memory',
    };
  }

  async getLogs(tenantId: number) {
    return this.logs.find({ where: { tenantId } });
  }
}
