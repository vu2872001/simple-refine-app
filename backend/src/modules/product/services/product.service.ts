import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { PageDTO } from '../../../common/dtos/page.dto';
import { CreateProductDTO } from '../dtos/createProduct.dto';
import { UpdateProductDTO } from '../dtos/updateProduct.dto';
import { IProductService } from '../interfaces/iProduct.service';
import { ProductRepository } from '../repository/product.repository';
import { IBaseService } from '../../../common/interface/iBase.service';
import { PageOptionsDTO } from '../../../common/dtos/pageOption.dto';

@Injectable()
export class ProductService
  implements
    IBaseService<Product, CreateProductDTO, UpdateProductDTO>,
    IProductService
{
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createData: CreateProductDTO): Promise<Product> {
    const product = await this.productRepository.createProduct(createData);
    await this.productRepository.save(product);

    return product;
  }

  async update(id: number, updateData: UpdateProductDTO): Promise<Product> {
    const updatedProduct = await this.productRepository.updateProduct(
      id,
      updateData,
    );
    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async delete(id: number): Promise<boolean> {
    return await this.productRepository.deleteProduct(id);
  }

  async restore(id: number): Promise<Product> {
    return this.productRepository.restoreProduct(id);
  }

  async getAllData(pageOptionsDto: PageOptionsDTO): Promise<PageDTO<Product>> {
    const products = await this.productRepository.getProductWithPage(
      pageOptionsDto,
    );
    return products;
  }

  async getDataById(id: number): Promise<Product> {
    const product = await this.productRepository.getProductById(id);
    return product;
  }

  async getProductByName(name: string): Promise<Product> {
    const product = await this.productRepository.getProductByName(name);
    return product;
  }
}
