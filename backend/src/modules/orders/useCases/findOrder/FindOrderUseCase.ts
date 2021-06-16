import { inject, injectable } from "tsyringe";

import { Order } from "@modules/orders/infra/typeorm/entities/Order";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";

interface IRequest {
  id: string;
}

@injectable()
class FindOrderUseCase {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({ id }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    return order;
  }
}

export { FindOrderUseCase };
