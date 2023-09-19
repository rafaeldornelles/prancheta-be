import { NextFunction, Request, Response } from "express";
import { BriefingBusiness } from "../business/briefing.business";

export class BriefingController {
    static async listByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const briefings = await BriefingBusiness.listByUser(res.locals.uid)
            return res.json(briefings)
        } catch (e) {
            next(e)
        }
    }

    static async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const briefing = req.body
            const result = await BriefingBusiness.insert(briefing, res.locals.uid)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    static async answer(req: Request, res: Response, next: NextFunction) {
        try {
            const { briefing, answers } = req.body
            const result = await BriefingBusiness.answer(briefing, answers)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }
}