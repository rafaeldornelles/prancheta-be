import { User } from "./user.interface";

export interface Project {
    name: string,
    user: User|string,
    createdAt: Date
}