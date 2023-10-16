import { Briefing } from "./briefing.interface";
import { ProjectStep } from "./projectStep.interface";
import { User } from "./user.interface";

export interface Project {
    name: string,
    user: User|string,
    createdAt: Date,
    briefing: Briefing|String
    steps: (String|ProjectStep)[]
}