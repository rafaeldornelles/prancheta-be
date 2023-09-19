import { model, Model, Schema, SchemaTypes } from "mongoose";
import { Briefing } from "../briefing.interface";

export interface briefingDocument extends Briefing, Document{}

const briefingSchema = new Schema({
    sender: {type: SchemaTypes.ObjectId, ref: "User"},
    client: {
        name: {type: String, required: true},
        email: {type: String, required: true}
    },
    questions: [{
        questionType: {type: String, enum: ["text", "number", "currency", "yesno", "multiple", "single"], required: true},
        caput: {type: String, required: true},
        options: {
            text: {type: String, required: false},
            image: {type: String, required: false},
        },
        answer: {type: String, required: false}
    }],
    answeredAt: {type: Date}
})

export const briefingModel: Model<Briefing> = model<Briefing>("Briefing", briefingSchema, "briefings")