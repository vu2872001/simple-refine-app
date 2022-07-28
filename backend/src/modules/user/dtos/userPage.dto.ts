import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserPageDTO {
  @ApiProperty()
  @IsOptional()
  page: number;

  @ApiProperty()
  @IsOptional()
  take: number;
}
