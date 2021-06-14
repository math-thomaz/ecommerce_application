import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IUpdateProductsQuantityDTO } from "@modules/products/dtos/IUpdateProductsQuantityDTO";
import { Product } from "@modules/products/infra/typeorm/entities/Product";

import { IProductsRepository } from "../IProductsRepository";

class ProductsRepositoryInMemory implements IProductsRepository {
  products: Product[] = [];

  async create({
    id,
    SKU,
    bar_code,
    name,
    platform,
    genre,
    price,
    quantity,
    description,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id,
      SKU,
      bar_code,
      name,
      platform,
      genre,
      price,
      quantity,
      description,
    });

    this.products.push(product);

    return product;
  }

  async findByName(name: string): Promise<Product> {
    return this.products.find((product) => product.name === name);
  }

  async findById(id: string): Promise<Product> {
    return this.products.find((product) => product.id === id);
  }

  async updateQuantity(
    products: IUpdateProductsQuantityDTO[]
  ): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.products.findIndex((product) => product.id === id);
    this.products[findIndex].available = available;
  }

  async list(): Promise<Product[]> {
    const all = this.products;
    return all;
  }
}

export { ProductsRepositoryInMemory };
