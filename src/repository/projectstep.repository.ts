import { ProjectStep } from "../model/projectStep.interface";
import { ProjectStepImage } from "../model/projectStepImage.interface";
import { ProjectStepModel } from "../model/schema/projectStep.model";
import { ProjectStepImageModel } from "../model/schema/projectStepImage.model";

export class ProjectStepRepository {
    static async insert(ps: ProjectStep): Promise<ProjectStep> {
        return ProjectStepModel.create(ps)
    }

    static async insertImage(psi: ProjectStepImage): Promise<ProjectStepImage> {
        return ProjectStepImageModel.create(psi)
    }

    static async findImgById(id:string): Promise<ProjectStepImage|null>{
        return ProjectStepImageModel.findById(id).exec()
    }
}