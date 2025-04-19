export interface IChoice {
    text: string;
    isCorrect: boolean;
}

export interface IQuestion {
    _id?: string;
    qid: string;
    questionType: 'Multiple Choice' | 'True/False' | 'Fill in the Blank';
    title: string;
    points: number;
    question: string;
    choices?: IChoice[];
    correctBoolean?: boolean;
    correctBlanks?: string[];
}