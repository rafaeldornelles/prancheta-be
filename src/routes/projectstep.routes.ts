import { Router } from "express";
import { ProjectStepController } from "../controller/projectstep.controller";

export const projectStepRouter = Router()

projectStepRouter.post("", ProjectStepController.insert)