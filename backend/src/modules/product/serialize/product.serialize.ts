import { Product } from '../entities/product.entity';

export function SerializeProduct(product: Product) {
  const newProduct = { ...product };
  delete newProduct.deletedAt;
  delete newProduct.isActivate;

  return newProduct;
}
