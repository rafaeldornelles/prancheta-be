import { PranchetaError } from "../middleware/error.handler";
import { ProjectStep } from "../model/projectStep.interface";
import { projectDocument } from "../model/schema/project.model";
import { ProjectStepDocument } from "../model/schema/projectStep.model";
import { User } from "../model/user.interface";
import { ProjectRepository } from "../repository/project.repository";
import { ProjectStepRepository } from "../repository/projectstep.repository";

export class ProjectStepBusiness {
    static async insert(ps: ProjectStep, uid: String): Promise<ProjectStep> {
        const project = await ProjectRepository.findById(ps.project as String) as projectDocument
        if(project && (project.user as User)._id == uid) {
            const inserted = await ProjectStepRepository.insert(ps)
            project.steps = project.steps.concat(inserted)
            project.save()
            return inserted
        } else {
            throw new PranchetaError(404, "Projeto não encontrado")
        }
    }
}