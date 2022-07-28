import { IsNumber, Max, Min, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Max(100000)
  price: number;

  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  info: string;
}
