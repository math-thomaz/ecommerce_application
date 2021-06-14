import { inject, injectable } from "tsyringe";

import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  category_id: string;
  SKU: string;
  bar_code: string;
  name: string;
  platform: string;
  genre: string;
  price: number;
  quantity: number;
  description: string;
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    category_id,
    SKU,
    bar_code,
    name,
    platform,
    genre,
    price,
    quantity,
    description,
  }: IRequest): Promise<Product> {
    const productAlreadyExists = await this.productsRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError("Product already exists!");
    }

    const product = this.productsRepository.create({
      category_id,
      SKU,
      bar_code,
      name,
      platform,
      genre,
      price,
      quantity,
      description,
    });

    return product;
  }
}

export { CreateProductUseCase };
