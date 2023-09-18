import { NextFunction, Request, Response } from "express";

export class PranchetaError extends Error{
    code: number
    constructor(code: number, message:string) {
        super(message)
        this.code = code
    }
}

export function handleError(error: Error, req: Request, res: Response, next: NextFunction) {
    if(error instanceof PranchetaError) {
        return res.status(error.code).json({code: error.code, message: error.message})
    }
    return res.status(500).json({code: 500, msg: error.message})
}