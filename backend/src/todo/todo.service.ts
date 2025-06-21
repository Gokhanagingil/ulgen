import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>,
  ) {}

  create(dto: CreateTodoDto & { tenantId: number }) {
    const todo = this.repo.create(dto);
    return this.repo.save(todo);
  }

  findAll(tenantId: number) {
    return this.repo.find({ where: { tenantId } });
  }
}
