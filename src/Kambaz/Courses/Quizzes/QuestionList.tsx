import { Card } from 'react-bootstrap';
import QuestionPreview from './QuestionPreview';
import { IQuestion } from './questionTypes';

export default function QuestionList({ questions }: { questions: IQuestion[] }) {
    if (questions.length === 0) {
        return (
            <Card className="text-center p-4">
                <Card.Text>No questions yet. Click "New Question" to add one.</Card.Text>
            </Card>
        );
    }

    return (
        <div>
            {questions.map((question, index) => (
                <QuestionPreview key={question._id || index} question={question} />
            ))}
        </div>
    );
};
