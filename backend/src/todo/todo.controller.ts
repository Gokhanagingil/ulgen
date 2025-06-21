import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() dto: CreateTodoDto, @Req() req: any) {
    return this.todoService.create(dto, req.tenantId);
  }

  @Get()
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID for multi-tenant isolation' })
  findAll(@Req() req: any) {
    return this.todoService.findAll(req.tenantId);
  }
}
