import { NextFunction, Request, Response } from "express";
import { ProjectStepBusiness } from "../business/projectstep.business";

export class ProjectStepController {
    static async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const projectStep = req.body
            const inserted = await ProjectStepBusiness.insert(projectStep, res.locals.uid)
            res.json(inserted)
        } catch(e) {
            next(e)
        }
    }

    static async answerFeedback(req: Request, res: Response, next: NextFunction) {
        try {
            const projectStep = req.body
            projectStep.project = res.locals.projectId
            const inserted = await ProjectStepBusiness.insertClient(projectStep)
            return res.json(inserted)
        } catch (e) {
            next(e)
        }
    }
}