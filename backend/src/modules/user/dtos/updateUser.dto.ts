import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
