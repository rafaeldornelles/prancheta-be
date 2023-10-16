import { QuestionOption, QuestionType } from "./question.interface";
import { User } from "./user.interface";

export interface DefaultBriefing {
    name: String
    description?: String
    questions: DefaultBriefingQuestion[]
    user: User|String
}

export interface DefaultBriefingQuestion {
    questionType: QuestionType;
    caput: string;
    options?: QuestionOption[];
    placeholder?: {type: String, required: false},
    trailingText?: String
}