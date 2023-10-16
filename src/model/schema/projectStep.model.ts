import { Model, Schema, SchemaTypes, model } from "mongoose";
import { ProjectStep, ProjectStepType } from "../projectStep.interface";

export interface ProjectStepDocument extends ProjectStep, Document{}

const projectStepSchema = new Schema({
    text: {type: String, required: true},
    date: {type: Date, default: Date.now},
    imgs: [{type: String, required: false}],
    type: {type: String, enum: ["visitation", "feedbackrequest", "feedbackresponse"], required: true},
    project: {type: SchemaTypes.ObjectId, ref:"Project"}
})

export const ProjectStepModel: Model<ProjectStepDocument> = model<ProjectStepDocument>("ProjectStep", projectStepSchema, "projectsteps")