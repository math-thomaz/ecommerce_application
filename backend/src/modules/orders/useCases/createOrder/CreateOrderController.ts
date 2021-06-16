import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateOrderUseCase } from "./CreateOrderUseCase";

class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, products } = request.body;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    const customer = await createOrderUseCase.execute({
      user_id,
      products,
    });

    return response.json(customer);
  }
}

export { CreateOrderController };
