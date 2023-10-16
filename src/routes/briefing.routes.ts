import { Router } from "express";
import { BriefingController } from "../controller/briefing.controller";

export const briefingRouter = Router()

briefingRouter.post("", BriefingController.insert)
briefingRouter.get("", BriefingController.listByUser)
briefingRouter.get("/:id", BriefingController.findById)
briefingRouter.put("/answer", BriefingController.answer)
briefingRouter.get("/defaults", BriefingController.defaultBriefings)
briefingRouter.post("defaults", BriefingController.setUserDefault)