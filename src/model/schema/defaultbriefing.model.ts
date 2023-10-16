import { Document, model, Model, Schema, SchemaTypes } from "mongoose"
import { DefaultBriefing } from "../defaultbriefing.interface"

export interface DefaultBriefingDocument extends DefaultBriefing, Document{}

const defaultBriefingSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    questions: [{
        questionType: {type: String, enum: ["text", "number", "currency", "yesno", "multiple", "single"], required: true},
        caput: {type: String, required: true},
        options: [{
            text: {type: String, required: false},
            image: {type: String, required: false},
        }],
        placeholder: {type: String, required: false},
        trailingText: {type: String, required: false}
    }],
    user: {type: SchemaTypes.ObjectId, ref: "User", required: false}
})

export const defaultBriefingModel: Model<DefaultBriefingDocument> = model<DefaultBriefingDocument>("DefaultBriefing", defaultBriefingSchema, "defaultbriefings")