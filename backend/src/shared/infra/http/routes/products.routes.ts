import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateProductController } from "@modules/products/useCases/createProduct/CreateProductController";
import { ListProductsController } from "@modules/products/useCases/listProducts/ListProductsController";
import { UploadProductImagesController } from "@modules/products/useCases/uploadProductImages/UploadProductImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const uploadProductImagesController = new UploadProductImagesController();

const upload = multer(uploadConfig);

productsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createProductController.handle
);

productsRoutes.get("/", listProductsController.handle);

productsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadProductImagesController.handle
);

export { productsRoutes };
