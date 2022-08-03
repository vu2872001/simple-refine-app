import { MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDTO {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  normalizeName: string;
}
