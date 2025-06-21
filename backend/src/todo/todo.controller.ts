import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiQuery({
    name: 'tenantId',
    required: false,
    type: Number,
    description: 'Tenant ID for multi-tenant isolation',
  })
  create(
    @Body() dto: CreateTodoDto,
    @Query('tenantId', ParseIntPipe) _tenantId: number | undefined,
    @Req() req: Request,
  ) {
    const tid = (req as any).user?.tenantId ?? _tenantId ?? 1;
    return this.todoService.create({ ...dto, tenantId: tid });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiQuery({ name: 'tenantId', required: true, type: Number, description: 'Tenant ID for multi-tenant isolation' })
  findAll(@Query('tenantId', ParseIntPipe) _tenantId: number, @Req() req: Request) {
    const tid = (req as any).user?.tenantId ?? _tenantId;
    return this.todoService.findAll(tid);
  }
}
