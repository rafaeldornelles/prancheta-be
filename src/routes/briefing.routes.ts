import { Router } from "express";
import { BriefingController } from "../controller/briefing.controller";

export const briefingRouter = Router()

briefingRouter.post("", BriefingController.insert)
briefingRouter.get("", BriefingController.listByUser)
briefingRouter.put("/answer", BriefingController.answer)