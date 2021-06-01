import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserController = container.resolve(CreateUserUseCase);

    await createUserController.execute({ name, email, password });

    return response.status(201).send();
  }
}

export { CreateUserController };
