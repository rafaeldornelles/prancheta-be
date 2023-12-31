import { Document, model, Model, Schema, SchemaType, SchemaTypes, Types } from "mongoose";
import { Project } from "../project.interface";


export interface projectDocument extends Project, Document{}

const projectSchema = new Schema({
    name: {type: String, required: true},
    user: {type: Types.ObjectId, required: true, ref: "User"},
    createdAt: {type: Date, default: Date.now()},
    briefing: {type: SchemaTypes.ObjectId, ref:"Briefing", required: true},
    steps: [{type: SchemaTypes.ObjectId, ref: "ProjectStep"}]
})

export const projectModel: Model<projectDocument> = model<projectDocument>("Project", projectSchema, "projects")