import { MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  permission: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(1000)
  info: string;
}
