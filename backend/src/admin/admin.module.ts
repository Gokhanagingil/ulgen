import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Log } from '../entities/log.entity';
import { DotWalkingService } from '../dotwalking.service';
import { RolesGuard } from '../roles.guard';
import { LoggingInterceptor } from '../logging.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, Log])],
  controllers: [AdminController],
  providers: [AdminService, DotWalkingService, RolesGuard, LoggingInterceptor],
})
export class AdminModule {}
