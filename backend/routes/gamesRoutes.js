import express from "express";
import { GamesController } from "../controllers/gamesController.js";
import { checkToken } from "../helpers/check-token.js";
export const gamesRouter = express.Router();

gamesRouter.post("/games/create", checkToken, GamesController.createGames);
gamesRouter.patch("/games/update", checkToken, GamesController.updateGames);
gamesRouter.delete("/games/delete", checkToken, GamesController.deleteGames);
