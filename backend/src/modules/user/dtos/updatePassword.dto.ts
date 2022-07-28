import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  confirmPassword: string;
}
