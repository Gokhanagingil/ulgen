import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy milk', description: 'Title of the todo item' })
  title: string;

  @ApiProperty({ example: false, description: 'Completion status', required: false })
  completed?: boolean;
}
