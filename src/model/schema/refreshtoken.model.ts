import { Document, model, Model, Schema } from "mongoose";
import { RefreshToken } from "../refreshtoken.interface";

export interface refreshTokenDocument extends RefreshToken, Document{}

const refreshTokenSchema = new Schema({
    token: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    createdAt: {type: Date, required: true, expires: 86400}
})

export const refreshTokenModel: Model<refreshTokenDocument> = model<refreshTokenDocument>("RefreshToken", refreshTokenSchema, "refreshtokens")