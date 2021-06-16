import { getRepository, In, Repository } from "typeorm";

import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IUpdateProductsQuantityDTO } from "@modules/products/dtos/IUpdateProductsQuantityDTO";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IFindProducts } from "@modules/products/repositories/IFindProducts";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({
    id,
    category_id,
    SKU,
    bar_code,
    name,
    platform,
    genre,
    price,
    quantity,
    description,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      id,
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

    await this.repository.save(product);

    return product;
  }

  async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map((product) => product.id);

    const existentProducts = await this.repository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }

  async findByName(name: string): Promise<Product> {
    const findProduct = await this.repository.findOne({
      name,
    });

    return findProduct;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne(id);

    return product;
  }

  async updateQuantity(
    products: IUpdateProductsQuantityDTO[]
  ): Promise<Product[]> {
    return this.repository.save(products);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }

  async list(): Promise<Product[]> {
    const all = await this.repository.find();

    return all;
  }
}

export { ProductsRepository };
