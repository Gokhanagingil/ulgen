import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiQuery({
    name: 'tenantId',
    required: false,
    type: Number,
    description: 'Tenant ID for multi-tenant isolation',
  })
  create(
    @Body() dto: CreateTodoDto,
    @Query('tenantId', ParseIntPipe) tenantId?: number,
  ) {
    const tid = tenantId ?? 1;
    return this.todoService.create({ ...dto, tenantId: tid });
  }

  @Get()
  @ApiQuery({ name: 'tenantId', required: true, type: Number, description: 'Tenant ID for multi-tenant isolation' })
  findAll(@Query('tenantId', ParseIntPipe) tenantId: number) {
    return this.todoService.findAll(tenantId);
  }
}
