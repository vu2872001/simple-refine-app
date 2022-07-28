import { IsOptional } from 'class-validator';

export class ProductPageDTO {
  @IsOptional()
  page: number;

  @IsOptional()
  take: number;
}
