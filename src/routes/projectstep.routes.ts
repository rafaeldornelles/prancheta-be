import { Router } from "express";
import { ProjectStepController } from "../controller/projectstep.controller";
import { verifyClientToken, verifyToken } from "../middleware/verify.middleware";

export const projectStepRouter = Router()

projectStepRouter.post("", verifyToken, ProjectStepController.insert)
projectStepRouter.post("/client/feedback", verifyClientToken, ProjectStepController.answerFeedback)
