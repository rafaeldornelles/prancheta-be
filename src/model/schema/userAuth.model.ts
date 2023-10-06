import { Document, model, Model, Schema, SchemaTypes } from "mongoose";
import { UserAuth } from "../userAuth.interface";

export interface userAuthDocument extends UserAuth, Document{}

const userAuthSchema = new Schema({
    user: {type: SchemaTypes.ObjectId, ref: "User", unique: true},
    password: {type: String, required: true},
    refreshToken: {type: String, required: false}
})

export const userAuthModel: Model<userAuthDocument> = model<userAuthDocument>("UserAuth", userAuthSchema, "userauths")