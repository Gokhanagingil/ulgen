import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TenantService } from './tenant.service';

@ApiTags('tenant')
@Controller('tenants')
export class TenantController {
  constructor(private readonly service: TenantService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.service.create(name);
  }
}
