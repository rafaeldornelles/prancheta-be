import { ProjectStep } from "../model/projectStep.interface";
import { ProjectStepModel } from "../model/schema/projectStep.model";

export class ProjectStepRepository {
    static async insert(ps: ProjectStep): Promise<ProjectStep> {
        return ProjectStepModel.create(ps)
    }
}