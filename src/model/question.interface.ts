
export interface Question {
    questionType: QuestionType;
    caput: string;
    options?: QuestionOption[];
    answer?: string;
    placeholder?: String,
    trailingText?: String
}

export enum QuestionType {
    TEXT = "text",
    MULTIPLE_OPTIONS = "multiple",
    SINGLE_OPTION = "single",
    CURRENCY = "currency",
    YESNO = "yesno",
    NUMBER = "number"
}

export interface QuestionOption {
    text: string;
    image?: string;
}
