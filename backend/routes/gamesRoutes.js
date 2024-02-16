import express from "express";
import { GamesController } from "../controllers/gamesController.js";
import { checkToken } from "../helpers/check-token.js";
export const gamesRouter = express.Router();

gamesRouter.get("/games", checkToken, GamesController.getAllGames);
gamesRouter.post("/games/create", checkToken, GamesController.createGames);
gamesRouter.patch("/games/update/:id", checkToken, GamesController.updateGames);
gamesRouter.delete(
  "/games/delete/:id",
  checkToken,
  GamesController.deleteGames
);
