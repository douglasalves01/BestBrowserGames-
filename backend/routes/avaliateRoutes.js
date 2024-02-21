import express from "express";
import { AvaliateController } from "../controllers/avaliateController.js";
import { checkToken } from "../helpers/check-token.js";

export const avaliateRouter = express.Router();

avaliateRouter.get(
  "/games/avaliate/:id",
  checkToken,
  AvaliateController.getAvaliate
);
avaliateRouter.get(
  "/games/avaliates/:id",
  checkToken,
  AvaliateController.getAll
);
avaliateRouter.post(
  "/games/avaliate/:id",
  checkToken,
  AvaliateController.avaliate
);
