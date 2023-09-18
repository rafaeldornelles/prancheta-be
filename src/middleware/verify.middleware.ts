import { NextFunction, Request, Response } from "express"
import { JwtPayload, verify } from "jsonwebtoken"
import { PranchetaError } from "./error.handler"

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try{
        const payload = verify(req.headers.authorization || "", process.env.JWT_SECRET || "") as JwtPayload
        const valid = (payload.iat! + payload.expiresIn) * 1000 >= Date.now()
        if (payload && valid) {
            res.locals.uid = payload.uid
            return next()
        }
    } catch {}
    throw new PranchetaError(401, "Unauthorized")
}