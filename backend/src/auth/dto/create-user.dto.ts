import { IsEmail, IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsNumber()
  @IsNotEmpty()
  tenantId: number;
}
