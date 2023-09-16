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

    static async login(req: Request, res: Response, next:NextFunction) {
        try {
            const {email, password} = req.body
            const tokens = await UserBusiness.login(email, password)
            res.json(tokens)
        } catch(e) {
            next(e)
        }
    }

    static async refreshToken(req:Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body
            const tokens = await UserBusiness.refreshToken(refreshToken)
            res.json(tokens)
        } catch(e) {
            next(e)
        }
    }
}