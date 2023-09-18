import { Document, model, Model, Schema, Types } from "mongoose";
import { Project } from "../project.interface";


export interface projectDocument extends Project, Document{}

const projectSchema = new Schema({
    name: {type: String, required: true},
    user: {type: Types.ObjectId, required: true, ref: "User"},
    createdAt: {type: Date, default: Date.now()}
})

export const projectModel: Model<projectDocument> = model<projectDocument>("Project", projectSchema, "projects")