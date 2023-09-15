import { Router } from "express";
import { UserController } from "../controller/user.controller";

export const userRouter = Router()

userRouter.post("/register", UserController.register)