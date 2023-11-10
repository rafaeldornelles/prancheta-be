import { Project } from "../model/project.interface";
import { briefingDocument } from "../model/schema/briefing.model";
import { projectDocument } from "../model/schema/project.model";
import { ProjectRepository } from "../repository/project.repository";
import { EmailBusiness } from "./email.business";

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
        return ProjectRepository.findById(id)
    }
}