import { Briefing } from "../model/briefing.interface";
import { Project } from "../model/project.interface";
import { briefingDocument } from "../model/schema/briefing.model";
import { BriefingRepository } from "../repository/briefing.repository";
import { ProjectRepository } from "../repository/project.repository";

export class ProjectBusiness {
    static async listByUser(uid: string) {
        return ProjectRepository.listByUser(uid)
    }

    static async insert(project: Project, userId: string) {
        project.user = userId
        const inserted = await ProjectRepository.insert(project)
        const briefing = inserted.briefing as briefingDocument
        await BriefingRepository.update(briefing._id, briefing)
        return inserted
    }
}