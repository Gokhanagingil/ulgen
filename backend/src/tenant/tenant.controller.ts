import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@ApiTags('tenant')
@Controller('tenants')
export class TenantController {
  constructor(private readonly service: TenantService) {}

  @Post()
  create(@Body() dto: CreateTenantDto) {
    return this.service.create(dto.name);
  }
}
