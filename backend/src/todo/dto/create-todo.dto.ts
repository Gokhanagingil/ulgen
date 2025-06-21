import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy milk', description: 'Title of the todo item' })
  @IsString()
  title: string;

  @ApiProperty({ example: false, description: 'Completion status', required: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
