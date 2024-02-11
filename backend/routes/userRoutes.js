import express from "express";
import { UserController } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/user/register", UserController.register);
userRouter.get("/user", UserController.login);
