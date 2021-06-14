import { ICreateCategoryDTO } from "@modules/products/dtos/ICreateCategoryDTO";
import { Category } from "@modules/products/infra/typeorm/entities/Category";

import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepositoryInMemory };
