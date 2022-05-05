import React from 'react';
import styled from 'styled-components';
import Card from './components/Card';
import { getQuestions } from './api/API';
import { QuestionState, Difficulty } from './api/API';

// Types
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App: React.FC = () => {
  // Datas
  const fullQuestions = 12;
  // States
  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionState[]>([]);
  const [number, setNumber] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([]);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(true);

  // functions
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await getQuestions(fullQuestions, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const confirmAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === fullQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };
  const prevQuestion = () => {
    const prevQuestion = number - 1;
    if (prevQuestion === -1) {
      setGameOver(true);
    }
    setNumber(prevQuestion);
  };

  return (
    <StyledApp>
      <div className="title">
        <h1>Quiz App</h1>
      </div>
      {gameOver || userAnswers.length === fullQuestions ? (
        <button className="start" onClick={startQuiz}>
          Start quiz
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score} </p> : null}
      {loading ? <p className="loading">Loading Questions...</p> : null}
      {!loading && !gameOver && (
        <Card
          questionNumber={number + 1}
          totalQuestions={fullQuestions}
          question={questions[number].question}
          answers={questions[number].answers}
          callback={confirmAnswer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
        />
      )}
      <div>
        {!gameOver && !loading && number !== fullQuestions - 1 && number > 0 ? (
          <button className="next-prev" onClick={prevQuestion}>
            Prev Question
          </button>
        ) : null}
        {!gameOver && !loading && number !== fullQuestions - 1 ? (
          <button className="next-prev" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </div>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  font-family: 'Poppins', sans-serif;
  height: 100%;
  overflow: auto;
  background-color: #01201f;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    h1 {
      font-size: 3rem;
      color: #eee;
    }
  }
  p.score {
    font-size: 1.5rem;
    color: #eee;
  }
  p.loading {
    font-size: 1.2rem;
    color: #4caf28;
  }
  button.start {
    background-color: #4caf50;
    color: #eee;
    font-size: 1.5rem;
    padding: 0.9rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin-top: 1rem;
    transition: all 0.3s ease;
    &:hover {
      background-color: #43a047;
    }
  }
  button.next-prev {
    background-color: #4caf50;
    color: #eee;
    font-size: 1rem;
    padding: 0.4rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 1rem 1rem;
    transition: all 0.3s ease;
    &:hover {
      background-color: #eee;
      color: #01201f;
      font-size: 1.1rem;
    }
  }
`;

export default App;
