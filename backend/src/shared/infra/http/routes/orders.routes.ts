import { Router } from "express";

import { CreateOrderController } from "@modules/orders/useCases/createOrder/CreateOrderController";
import { FindOrderController } from "@modules/orders/useCases/findOrder/FindOrderController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();
const findOrderController = new FindOrderController();

ordersRoutes.post("/", ensureAuthenticated, createOrderController.handle);
ordersRoutes.get("/:id", ensureAuthenticated, findOrderController.handle);

export { ordersRoutes };
