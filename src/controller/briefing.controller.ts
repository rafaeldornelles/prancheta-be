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
            briefing.sender = res.locals.uid
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

    static async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const result = await BriefingBusiness.findById(id)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    static async defaultBriefings(req: Request, res: Response, next: NextFunction) {
        try {
            const briefings = await BriefingBusiness.defaultBriefings(res.locals.uid)
            res.send(briefings)
        } catch (e) {
            next(e)
        }
    }

    static async setUserDefault(req: Request, res: Response, next: NextFunction) {
        try {
            const defaultBriefings = req.body
            const inserted = await BriefingBusiness.setUserDefault(res.locals.uid, defaultBriefings)
            res.json(inserted)
        } catch(e) {
            next(e)
        }
    }

    static async getClientBriefing(req: Request, res: Response, next: NextFunction) {
        try {
            const briefingId = res.locals.briefingId
            const briefing = await BriefingBusiness.findById(briefingId, true)
            res.json(briefing)
        } catch(e) {
            next(e)
        }
    }
}