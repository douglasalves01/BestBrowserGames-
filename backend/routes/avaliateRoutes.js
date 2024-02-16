import express from "express";
import { AvaliateController } from "../controllers/avaliateController.js";
import { checkToken } from "../helpers/check-token.js";

export const avaliateRouter = express.Router();

avaliateRouter.post(
  "/games/avaliate/:id",
  checkToken,
  AvaliateController.avaliate
);
