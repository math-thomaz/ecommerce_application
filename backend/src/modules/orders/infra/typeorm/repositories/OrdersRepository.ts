import { getRepository, Repository } from "typeorm";

import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";

import { Order } from "../entities/Order";

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }
  async create({ user, products }: ICreateOrderDTO): Promise<Order> {
    const order = this.repository.create({
      user,
      order_products: products,
    });

    await this.repository.save(order);

    return order;
  }
  async findById(id: string): Promise<Order> {
    const order = this.repository.findOne(id, {
      relations: ["order_products", "user"],
    });

    return order;
  }
}

export { OrdersRepository };
