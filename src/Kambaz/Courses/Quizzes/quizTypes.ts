export interface IQuiz {
    _id: string;
    name: string;
    course: string;
    description: string;
    points: number;
    numQuestions: number;
    availableDate: Date;
    untilDate: Date;
    dueDate: Date;
    published: boolean;
    quizType: 'Graded Quiz' | 'Practice Quiz' | 'Graded Survey' | 'Ungraded Survey';
    assignmentGroup: 'Quizzes' | 'Exams' | 'Assignments' | 'Project';
    score?: number;
    shuffleAnswers: boolean;
    isTimeLimitEnalbled: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    attemptsAllowed: number;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
}