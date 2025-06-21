import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID for multi-tenant isolation' })
  create(@Body() dto: CreateTodoDto, @Query('tenantId') tenantId: string) {
    return this.todoService.create(dto, Number(tenantId));
  }

  @Get()
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID for multi-tenant isolation' })
  findAll(@Query('tenantId') tenantId: string) {
    return this.todoService.findAll(Number(tenantId));
  }
}
