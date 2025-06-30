import { Controller, Post, Body, Param, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { DotWalkingService } from '../dotwalking.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly dot: DotWalkingService) {}

  @Post('tables')
  @Roles('Admin')
  createTable(@Body('name') name: string) {
    return this.adminService.createTable(name);
  }

  @Post('fields')
  @Roles('Admin')
  addField(@Body('table') table: string, @Body('field') field: string) {
    return this.adminService.addField(table, field);
  }

  @Post('relations')
  @Roles('Admin')
  createRelation(@Body() body: any) {
    return this.adminService.createRelation(body);
  }

  @Post('roles')
  @Roles('Admin')
  createRole(@Body() dto: CreateRoleDto) {
    return this.adminService.createRole(dto.name);
  }

  @Post('users/:id/roles')
  @Roles('Admin')
  assignRole(@Param('id') id: number, @Body() dto: AssignRoleDto) {
    return this.adminService.assignRole(id, dto.role);
  }

  @Get('config')
  @Roles('Admin')
  getConfig() {
    return this.adminService.getConfig();
  }

  @Get('dotwalking')
  @Roles('Admin')
  testDot(@Query('query') query: string) {
    const sample = { user: { email: 'user@example.com', tenant: { name: 'Tenant' } } };
    return this.dot.parse(sample, query);
  }

  @Get('logs')
  @Roles('Admin')
  async getLogs(@Query('tenantId') tenantId: number) {
    return this.adminService.getLogs(Number(tenantId));
  }
}

