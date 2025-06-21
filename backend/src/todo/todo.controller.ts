import { Controller, Get, Post, Body, Req } from '@nestjs/common';
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
  findAll(@Req() req: any) {
    return this.todoService.findAll(req.tenantId);
  }
}
