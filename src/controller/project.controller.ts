import { NextFunction, Request, Response } from "express";
import { ProjectBusiness } from "../business/project.business";

export class ProjectController {
    static async listByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const projects = await ProjectBusiness.listByUser(res.locals.uid)
            return res.json(projects)
        } catch (e) {
            next(e)
        }
    }

    static async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const project = req.body
            const result = await ProjectBusiness.insert(project, res.locals.uid)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }
}