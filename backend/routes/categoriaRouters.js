import express from "express";
import { checkToken } from "../helpers/check-token.js";
import { CategoriaController } from "../controllers/categoriaController.js";

export const categoriaRouter = express.Router();

categoriaRouter.post(
  "/categoria/create",
  checkToken,
  CategoriaController.create
);
