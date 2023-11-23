import { Router } from "express";
import { BriefingController } from "../controller/briefing.controller";
import { verifyClientToken, verifyToken } from "../middleware/verify.middleware";

export const briefingRouter = Router()

briefingRouter.post("", verifyToken, BriefingController.insert)
briefingRouter.get("", verifyToken, BriefingController.listByUser)
briefingRouter.get("/defaults", verifyToken, BriefingController.defaultBriefings)
briefingRouter.get("/client", verifyClientToken, BriefingController.getClientBriefing)
briefingRouter.get("/:id", verifyToken, BriefingController.findById)
briefingRouter.put("/answer", verifyToken, BriefingController.answer)
briefingRouter.put("/client/answer", verifyClientToken, BriefingController.answer)
briefingRouter.post("/defaults", verifyToken, BriefingController.setUserDefault)