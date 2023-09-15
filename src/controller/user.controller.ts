import { Request, Response, NextFunction } from "express";
import { UserBusiness } from "../business/user.business";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body
            const created = await UserBusiness.register(user)
            return res.json(created)
        } catch(e) {
            next(e)
        }
    }
}