import { Router } from "express";
import { ProjectController } from "../controller/project.controller";

export const projectRouter = Router()

projectRouter.get("/", ProjectController.listByUser)
projectRouter.post("/insert", ProjectController.insert)