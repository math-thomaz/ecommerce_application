import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ImportUserController } from "@modules/accounts/useCases/importUser/ImportUserController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadPath = multer(uploadConfig);

const createUserController = new CreateUserController();
const importUserController = new ImportUserController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.post(
  "/import",
  uploadPath.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importUserController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
