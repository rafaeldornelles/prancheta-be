import { Briefing } from "../model/briefing.interface";
import { Project } from "../model/project.interface";
import { briefingDocument } from "../model/schema/briefing.model";
import { BriefingRepository } from "../repository/briefing.repository";
import { ProjectRepository } from "../repository/project.repository";

export class ProjectBusiness {
    static async listByUser(uid: string) {
        return ProjectRepository.listByUser(uid)
    }

    static async insert(project: Project, userId: string): Promise<Project> {
        project.user = userId
        const inserted = await ProjectRepository.insert(project)
        await inserted.populate("briefing")
        await inserted.populate("user")
        const briefing = inserted.briefing as briefingDocument
        briefing.project = inserted._id
        await briefing.save()
        return inserted
    }

    static async findById(id: String): Promise<Project|null> {
        return ProjectRepository.findById(id)
    }
}