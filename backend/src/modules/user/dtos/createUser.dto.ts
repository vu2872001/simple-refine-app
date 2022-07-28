import {
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsAlphanumeric,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(6)
  @MaxLength(15)
  password: string;
}
