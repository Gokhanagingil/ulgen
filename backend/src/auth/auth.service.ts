import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.users.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new UnauthorizedException('email already used');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.users.create({
      username: dto.username,
      email: dto.email,
      password: hashed,
      tenantId: dto.tenantId,
    });
    await this.users.save(user);
    return { id: user.id, username: user.username, email: user.email };
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('invalid credentials');
    const payload = { sub: user.id, tenantId: user.tenantId };
    return { accessToken: await this.jwt.signAsync(payload) };
  }
}
