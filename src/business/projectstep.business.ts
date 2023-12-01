import { PranchetaError } from "../middleware/error.handler";
import { ProjectStep, ProjectStepType } from "../model/projectStep.interface";
import { ProjectStepImage } from "../model/projectStepImage.interface";
import { projectDocument } from "../model/schema/project.model";
import { ProjectStepImageModel } from "../model/schema/projectStepImage.model";
import { User } from "../model/user.interface";
import { ProjectRepository } from "../repository/project.repository";
import { ProjectStepRepository } from "../repository/projectstep.repository";
import { EmailBusiness } from "./email.business";

export class ProjectStepBusiness {
    static async insert(ps: ProjectStep, uid: String): Promise<ProjectStep> {
        const project = await ProjectRepository.findById(ps.project as String) as projectDocument
        if(project && (project.user as User)._id == uid) {
            if (ps.imgs)
            ps.imgs = await Promise.all(ps.imgs.map(async (img) => {
                const psi: ProjectStepImage = {
                    data: img
                }
                const insertedImg = await ProjectStepRepository.insertImage(psi)
                return insertedImg._id as string
            }))
            const inserted = await ProjectStepRepository.insert(ps)
            project.steps = project.steps.concat(inserted)
            project.save()

            if (inserted.type == ProjectStepType.VISITATION) {
                EmailBusiness.sendProjectVisitationEmail(project)
            } else if (inserted.type == ProjectStepType.FEEDBACK_REQUEST) {
                EmailBusiness.sendFeedbackRequestEmail(project)
            }
            return inserted
        } else {
            throw new PranchetaError(404, "Projeto não encontrado")
        }
    }


    static async insertClient(ps: ProjectStep): Promise<ProjectStep> {
        const project = await ProjectRepository.findById(ps.project as String) as projectDocument
        const inserted = await ProjectStepRepository.insert(ps)
        const steps = project.steps as ProjectStep[]
        if(!steps.some(ps => ps.type == ProjectStepType.FEEDBACK_REQUEST) || steps.some(ps => ps.type == ProjectStepType.FEEDBACK_RESPONSE)) throw new PranchetaError(400, "Feedback não solicitado ou já respondido.")
        project.steps = project.steps.concat(inserted)
        project.save()
        return inserted
    }
}