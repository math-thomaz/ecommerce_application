import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { CategoriesRepository } from "@modules/products/infra/typeorm/repositories/CategoriesRepository";
import { ProductsImagesRepository } from "@modules/products/infra/typeorm/repositories/ProductsImagesRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { ICategoriesRepository } from "@modules/products/repositories/ICategoriesRepository";
import { IProductsImagesRepository } from "@modules/products/repositories/IProductsImagesRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<IProductsImagesRepository>(
  "ProductsImagesRepository",
  ProductsImagesRepository
);

container.registerSingleton<IOrdersRepository>(
  "OrdersRepository",
  OrdersRepository
);
