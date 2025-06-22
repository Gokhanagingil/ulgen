import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Role) private readonly rolesRepo: Repository<Role>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const rolesCount = await this.rolesRepo.count();
    if (rolesCount === 0) return true;
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.roles || user.roles.length === 0) {
      // allow first role assignment scenario
      if (rolesCount === 1) return true;
      return false;
    }
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
