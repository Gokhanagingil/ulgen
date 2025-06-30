import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    const existing = await this.users.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new UnauthorizedException('email already used');
    }
    const user = this.users.create({
      username: dto.username,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
      tenantId: dto.tenantId,
      role: dto.role,
    });
    return this.users.save(user);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('invalid credentials');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('invalid credentials');

    const payload = {
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwt.signAsync(payload),
    };
  }
}
