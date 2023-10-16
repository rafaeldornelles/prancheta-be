import { Project } from "../model/project.interface";
import { projectModel } from "../model/schema/project.model";

export class ProjectRepository {
    static async listByUser(uid: string) {
        return projectModel.find({user: uid}).populate("briefing").populate("user").populate("steps").exec()
    }

    static async insert(project: Project) {
        return projectModel.create(project)
    }

    static async findById(id: String) : Promise<Project|null> {
        return projectModel.findById(id).populate("briefing").populate("user").populate("steps").exec()
    }
}