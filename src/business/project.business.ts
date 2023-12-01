import { PranchetaError } from "../middleware/error.handler";
import { Project } from "../model/project.interface";
import { ProjectStep } from "../model/projectStep.interface";
import { ProjectStepImage } from "../model/projectStepImage.interface";
import { briefingDocument } from "../model/schema/briefing.model";
import { projectDocument } from "../model/schema/project.model";
import { ProjectRepository } from "../repository/project.repository";
import { ProjectStepRepository } from "../repository/projectstep.repository";
import { EmailBusiness } from "./email.business";
import { ProjectStepBusiness } from "./projectstep.business";

export class ProjectBusiness {
    static async listByUser(uid: string) {
        return ProjectRepository.listByUser(uid)
    }

    static async insert(project: Project, userId: string): Promise<Project> {
        project.user = userId
        const inserted = await ProjectRepository.insert(project) as projectDocument
        await inserted.populate("briefing")
        await inserted.populate("user")
        const briefing = inserted.briefing as briefingDocument
        briefing.project = inserted._id
        await briefing.save()
        EmailBusiness.sendProjectStartedEmail(inserted)
        return inserted
    }

    static async findById(id: String): Promise<Project|null> {
        const project = (await ProjectRepository.findById(id) as projectDocument).toObject() as Project
        if (project && project.steps) {
            project.steps = project.steps.map(step => {
                step = step as ProjectStep
                if (step.imgs) {
                    step.imgs = step.imgs.map(img => `/project/img/${img}`)
                    console.log(step.imgs)
                }
                return step
            })
        }
        return project
    }

    static async getImg(id: string): Promise<string> {
        const image = await ProjectStepRepository.findImgById(id)
        if(image) return image.data
        throw new PranchetaError(404, "imagem não encontrada")
    }
}