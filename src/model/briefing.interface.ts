import { Project } from "./project.interface";
import { Question } from "./question.interface";
import { User } from "./user.interface";

export interface Briefing {
    sender: User|string,
    client: Client,
    questions: Question[],
    answeredAt?: Date,
    sendedAt: Date,
    project?: Project|String
}

export interface Client {
    name: string,
    email: string
}