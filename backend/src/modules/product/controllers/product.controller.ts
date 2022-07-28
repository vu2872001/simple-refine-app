import {
  Get,
  Body,
  Param,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductPageDTO } from '../dtos/productPage.dto';
import { ProductService } from '../services/product.service';
import { FindOneParams } from '../../../utils/findOneParams';
import { CreateProductDTO } from '../dtos/createProduct.dto';
import { UpdateProductDTO } from '../dtos/updateProduct.dto';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    return this.productService.create(createProductDTO);
  }

  @Put('update/:id')
  async updateProduct(
    @Param() { id }: FindOneParams,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    return this.productService.update(Number(id), updateProductDTO);
  }

  @Delete('delete/:id')
  async deleteProduct(@Param() { id }: FindOneParams) {
    return this.productService.delete(Number(id));
  }

  @Put('restore/:id')
  async restoreProduct(@Param() { id }: FindOneParams) {
    return this.productService.restore(Number(id));
  }

  @Get()
  async getProducts(@Body() pageOption: ProductPageDTO) {
    return this.productService.getAllData(pageOption);
  }

  @Get(':id')
  async getProductById(@Param() { id }: FindOneParams) {
    return this.productService.getDataById(Number(id));
  }
}
