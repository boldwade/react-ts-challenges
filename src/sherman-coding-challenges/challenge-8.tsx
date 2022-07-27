import React, { useState } from "react";

interface Question {
    question: string;
    answers: string[];
    correct: number;
}

export const Challenge8 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correct, setCorrect] = useState(0);

    const isInQuestions = () => (currentIndex <= QUESTIONS?.length - 1);

    const onScoreQuestion = (isCorrect: boolean) => {
        if (isCorrect) setCorrect(prevState => prevState + 1);
        setCurrentIndex(prevState => prevState + 1);
    }

    return (
        <>
            <h4>Challenge 8 - Quiz</h4>
            <hr />
            {isInQuestions() && <QuestionAndAnswer question={QUESTIONS[currentIndex]} onScoreQuestion={onScoreQuestion} />}
            {!isInQuestions() && <>Correct: {correct} - {(correct / QUESTIONS.length) * 100}%</>}
        </>
    );
};
export default Challenge8;

const QuestionAndAnswer = ({ question, onScoreQuestion }: { question: Question, onScoreQuestion: (isCorrect: boolean) => void }) => {
    const onAnswerClicked = (answer: string, index: number) => onScoreQuestion(index === question.correct);
    return (
        <React.Fragment key={question.question}>
            <h5>
                {question.question}
            </h5>
            <div>
                <Answers answers={question.answers} onAnswerClicked={onAnswerClicked} />
            </div>
        </React.Fragment>
    );
};

const Answers = ({ answers, onAnswerClicked }: { answers: string[], onAnswerClicked: (answer: string, index: number) => void }) => {
    const renderAnswer = (answer: string, index: number) => {
        const handleAnswerClick = () => onAnswerClicked(answer, index);
        return <div key={answer} onClick={handleAnswerClick}>{answer}</div>;
    }

    return (
        <>
            {answers.map(renderAnswer)}
        </>
    );
};


const QUESTIONS: Question[] = [
    {
        question: "What is 2*(4+4)?",
        answers: ["2", "4", "8", "16"],
        correct: 3,
    },
    {
        question: "What is 9*9?",
        answers: ["18", "81", "80", "79"],
        correct: 1,
    },
    {
        question: "Who was the first president of the United States?",
        answers: [
            "George Washington",
            "John Adams",
            "John Quincy Adams",
            "Thomas Jefferson",
        ],
        correct: 0,
    },
    {
        question: "What state is Philadelphia in?",
        answers: [
            "Commonwealth of Pennsylvania",
            "New Jersey",
            "New York",
            "Massachusetts",
        ],
        correct: 0,
    },
    {
        question: "What are the two major political parties in the United States?",
        answers: [
            "Democratic Party & Republican Party",
            "Green Party & Red Party",
            "Bull Party & Moose Party",
            "Hamilton Party & Burr Party",
        ],
        correct: 0,
    },
];
