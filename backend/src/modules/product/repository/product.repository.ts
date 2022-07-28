import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { PageDTO } from '../../../common/dtos/page.dto';
import { CreateProductDTO } from '../dtos/createProduct.dto';
import { UpdateProductDTO } from '../dtos/updateProduct.dto';
import { PageMetaDTO } from '../../../common/dtos/pageMeta.dto';
import { SerializeProduct } from '../serialize/product.serialize';
import { PageOptionsDTO } from '../../../common/dtos/pageOption.dto';
import { ProductPageOptionsDTO } from '../dtos/productPageOptions.dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async getAllProduct(): Promise<Product[]> {
    return await this.find();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.findOne({ where: { id: id } });
    return SerializeProduct(product);
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = this.create(createProductDTO);
    return product;
  }

  async updateProduct(
    id: number,
    updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    const product = await this.getProductById(id);
    const updatedProduct = { ...product, ...updateProductDTO };
    return SerializeProduct(updatedProduct);
  }

  async getProductByName(name: string): Promise<Product> {
    const product = await this.findOne({ where: { name: name } }).then();
    return SerializeProduct(product);
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = await this.getProductById(id);
    const deletedProduct = { ...product, isActivate: false };
    await this.save(deletedProduct);

    const deletedResponse = await this.softDelete(id);
    if (!deletedResponse.affected) {
    }

    return true;
  }

  async restoreProduct(id: number): Promise<Product> {
    const restoreResponse = await this.restore(id);
    if (!restoreResponse.affected) {
    }

    const product = await this.getProductById(id);
    const restoredProduct = { ...product, isActivate: true };
    return SerializeProduct(restoredProduct);
  }

  async getProductWithPage(
    pageOptionsDto: PageOptionsDTO,
  ): Promise<PageDTO<Product>> {
    const productPageOptions: ProductPageOptionsDTO = new ProductPageOptionsDTO(
      pageOptionsDto.page,
      pageOptionsDto.take,
    );

    const productCount = await this.count({
      // where: pageOptionsDto.where,
      // order: pageOptionsDto.order,
    });

    const products = await this.find({
      // where: pageOptionsDto.where,
      // order: pageOptionsDto.order,
      skip: (productPageOptions.page - 1) * productPageOptions.take,
      take: productPageOptions.take,
    });

    const serializeProduct = products.map((product: Product) => {
      return SerializeProduct(product);
    });

    const dataReturn: PageDTO<Product> = new PageDTO(
      serializeProduct,
      new PageMetaDTO({
        pageOptionsDTO: productPageOptions,
        itemCount: productCount,
      }),
    );

    return dataReturn;
  }
}
