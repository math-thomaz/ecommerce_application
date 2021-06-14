import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/products/dtos/ICreateCategoryDTO";
import { Category } from "@modules/products/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/products/repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }
  async create({ name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
