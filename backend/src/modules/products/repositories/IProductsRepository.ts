import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";

import { IUpdateProductsQuantityDTO } from "../dtos/IUpdateProductsQuantityDTO";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findByName(name: string): Promise<Product>;
  findById(id: string): Promise<Product>;
  updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]>;
  updateAvailable(id: string, available: boolean): Promise<void>;
  list(): Promise<Product[]>;
}

export { IProductsRepository };
