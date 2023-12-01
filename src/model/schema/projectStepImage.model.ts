import { Model, Schema, SchemaTypes, model } from "mongoose";
import { ProjectStepImage } from "../projectStepImage.interface";

export interface ProjectStepImageDocument extends ProjectStepImage, Document{}

const projectStepImageSchema = new Schema({
    data: {type: String, required: true}
})

export const ProjectStepImageModel: Model<ProjectStepImageDocument> = model<ProjectStepImageDocument>("ProjectStepImage", projectStepImageSchema, "projectstepimages")