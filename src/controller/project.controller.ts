import { NextFunction, Request, Response } from "express";
import { ProjectBusiness } from "../business/project.business";
import { PranchetaError } from "../middleware/error.handler";
import { User } from "../model/user.interface";

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

    static async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await ProjectBusiness.findById(req.params.id)
            if (!result) {
                throw new PranchetaError(404, "projeto não encontrado")
            } else if (res.locals.uid != (result.user as User)._id) {
                throw new PranchetaError(401, "Não autorizado")
            }
            return res.json(result)
        } catch (e) {
            next(e)            
        }
    }

    static async getClientProject(req: Request, res: Response, next: NextFunction) {
        try {
            const projectId = res.locals.projectId
            const project = await ProjectBusiness.findById(projectId)
            res.json(project)
        } catch(e) {
            next(e)
        }
    }

    static async getImg(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const image = await ProjectBusiness.getImg(id)
            var img = Buffer.from(image, 'base64');

            res.writeHead(200, {
              'Content-Type': 'image/jpeg',
              'Content-Length': img.length
            });
            res.end(img);
        } catch(e) {
            next(e)
        }
    }
}