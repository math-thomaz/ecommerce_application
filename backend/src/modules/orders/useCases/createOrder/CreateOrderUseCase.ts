import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Order } from "@modules/orders/infra/typeorm/entities/Order";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  user_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderUseCase {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, products }: IRequest): Promise<Order> {
    const customerExists = await this.usersRepository.findById(user_id);

    if (!customerExists) {
      throw new AppError("Couldl not find any customer with the given id");
    }

    const existentProducts = await this.productsRepository.findAllById(
      products
    );

    if (!existentProducts.length) {
      throw new AppError("Could not find any products with the given ids");
    }

    const existentProductsIds = existentProducts.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !existentProductsIds.includes(product.id)
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`
      );
    }

    const findProductsWithNoQuantityAvailable = products.filter(
      (product) =>
        existentProducts.filter((p) => p.id === product.id)[0].quantity <=
        product.quantity
    );

    if (findProductsWithNoQuantityAvailable.length) {
      throw new AppError(
        `The quantity ${findProductsWithNoQuantityAvailable[0].quantity} is not available for ${findProductsWithNoQuantityAvailable[0].id}`
      );
    }

    const formattedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existentProducts.filter((p) => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      user: customerExists,
      products: formattedProducts,
    });

    const { order_products } = order;

    const orderedProductsQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        existentProducts.filter((p) => p.id === product.product_id)[0]
          .quantity - product.quantity,
    }));

    await this.productsRepository.updateQuantity(orderedProductsQuantity);

    return order;
  }
}

export { CreateOrderUseCase };
