import { Router } from "express";
import { ProjectController } from "../controller/project.controller";
import { verifyClientToken, verifyToken } from "../middleware/verify.middleware";

export const projectRouter = Router()

projectRouter.get("/", verifyToken, ProjectController.listByUser)
projectRouter.post("/insert", verifyToken, ProjectController.insert)
projectRouter.get("/client", verifyClientToken, ProjectController.getClientProject)
projectRouter.get("/:id", verifyToken, ProjectController.findById)