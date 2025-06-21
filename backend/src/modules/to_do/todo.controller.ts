import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './todo.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Post()
  create(@Body() dto: CreateTodoDto): Promise<TodoEntity> {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('tenantId') tenantId?: string): Promise<TodoEntity[]> {
    const id = tenantId ? Number(tenantId) : 1;
    return this.service.findAll(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
