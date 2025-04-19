import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, Container } from 'react-bootstrap';
import * as quizClient from './client';
import QuizDetailsEditor from './QuizDetailsEditor';
import QuizQuestionsEditor from './QuizQuestionsEditor';

export default function QuizEditor() {
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('details');

    useEffect(() => {
        if (!qid) {
            setError("No Quiz ID provided");
            setLoading(false);
            return;
        }

        const fetchQuiz = async () => {
            try {
                const quizData = await quizClient.getQuiz(qid);
                setQuiz(quizData);
            } catch (err) {
                console.error("Failed to fetch quiz:", err);
                setError("Failed to load quiz data");
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [qid]);

    if (!qid) {
        return <div className="alert alert-danger">Error: Quiz ID is missing</div>;
    }

    if (loading) {
        return <div>Loading quiz...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!quiz) {
        return <div className="alert alert-danger">Quiz not found</div>;
    }

    return (
        <Container className="mt-3">
            <h2>Edit Quiz {quiz.title}</h2>

            <Tabs
                activeKey={activeTab}
                id="quiz-edit-tabs"
                className="mb-3"
                onSelect={(key: string | null) => {
                    if (key) {
                        setActiveTab(key);
                    }
                }}
            >
                <Tab
                    eventKey="details"
                    title={<span className={activeTab === 'details' ? "text-dark" : "text-danger"}>Details</span>}
                >
                    <QuizDetailsEditor />
                </Tab>
                <Tab
                    eventKey="questions"
                    title={<span className={activeTab === 'questions' ? "text-dark" : "text-danger"}>Questions</span>}
                >
                    <QuizQuestionsEditor />
                </Tab>
            </Tabs>
        </Container>
    );
}