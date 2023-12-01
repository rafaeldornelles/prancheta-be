import { Project } from "./project.interface"

export interface ProjectStep {
    text: string
    date: Date
    imgs?: string[]
    type: ProjectStepType
    project: Project|String
}

export enum ProjectStepType {
    VISITATION = "visitation",
    FEEDBACK_REQUEST = "feedbackrequest",
    FEEDBACK_RESPONSE = "feedbackresponse"
}