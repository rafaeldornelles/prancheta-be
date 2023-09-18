import { Project } from "../model/project.interface";
import { ProjectRepository } from "../repository/project.repository";

export class ProjectBusiness {
    static async listByUser(uid: string) {
        return ProjectRepository.listByUser(uid)
    }

    static async insert(project: Project, userId: string) {
        project.user = userId
        return ProjectRepository.insert(project)
    }
}