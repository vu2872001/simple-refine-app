import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1000)
  @Max(100000)
  price: number;

  @IsNotEmpty()
  info: string;
}
