import { Product } from '../entities/product.entity';

export interface IProductService {
  getProductByName(name: string): Promise<Product>;
}
