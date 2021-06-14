import { ICreateCategoryDTO } from "@modules/products/dtos/ICreateCategoryDTO";
import { Category } from "@modules/products/infra/typeorm/entities/Category";

interface ICategoriesRepository {
  create({ name }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository };
