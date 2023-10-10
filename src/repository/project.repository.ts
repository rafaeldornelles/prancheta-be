import { Project } from "../model/project.interface";
import { projectModel } from "../model/schema/project.model";

export class ProjectRepository {
    static async listByUser(uid: string) {
        return projectModel.find({user: uid}).populate("briefing").exec()
    }

    static async insert(project: Project) {
        return projectModel.create(project)
    }
}