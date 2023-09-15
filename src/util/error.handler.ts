import { NextFunction, Request, Response } from "express";

export function handleError(error: Error, req: Request, res: Response, next: NextFunction) {
    return res.status(500).send("Erro " + error.message)
}