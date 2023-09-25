import { Document, model, Model, Schema } from "mongoose";
import { User } from "../user.interface";

export interface userDocument extends User, Document{}

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true}
})

export const userModel: Model<userDocument> = model<userDocument>("User", userSchema, "users")