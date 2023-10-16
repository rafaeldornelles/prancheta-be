import { Project } from "./project.interface"

export interface ProjectStep {
    text: String
    date: Date
    imgs?: String[]
    type: ProjectStepType
    project: Project|String
}

export enum ProjectStepType {
    VISITATION = "visitation",
    FEEDBACK_REQUEST = "feedbackrequest",
    FEEDBACK_RESPONSE = "feedbackresponse"
}