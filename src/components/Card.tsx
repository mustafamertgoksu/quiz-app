import React from 'react';
import styled from 'styled-components';
import { AnswerObject } from '../App';
import { ButtonsContainer } from '../styles/UserAnswer.styles';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const Card: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <StyledCard>
      <div className="number">
        Question {questionNumber} of {totalQuestions}
      </div>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <ButtonsContainer
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button disabled={!!userAnswer} onClick={callback} value={answer}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonsContainer>
        ))}
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  @media (max-width: 1024px) {
    width: 90%;
  }
  .number {
    font-size: 1.2rem;
    color: #4caf50;
    margin-bottom: 10px;
  }
`;

export default Card;
