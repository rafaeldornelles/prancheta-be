
export interface Question {
    questionType: QuestionType;
    caput: string;
    options?: QuestionOption[];
    option_image?: string[];
    answer?: string;
    placeholder?: String,
    trailingText?: String
}

export enum QuestionType {
    TEXT = "text",
    MULTIPLE_OPTIONS = "multiple",
    SINGLE_OPTION = "single"
}

export interface QuestionOption {
    text: string;
    image?: string;
}
