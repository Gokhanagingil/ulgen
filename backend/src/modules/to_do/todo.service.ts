import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private repo: Repository<TodoEntity>,
  ) {}

  create(dto: CreateTodoDto) {
    const tenantId = dto.tenantId ?? 1;
    const todo = this.repo.create({ ...dto, tenantId, completed: false });
    return this.repo.save(todo);
  }

  findAll(tenantId = 1) {
    return this.repo.find({ where: { tenantId } });
  }

  async update(id: number, dto: UpdateTodoDto) {
    await this.repo.update(id, dto);
    return this.repo.findOneBy({ id });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
