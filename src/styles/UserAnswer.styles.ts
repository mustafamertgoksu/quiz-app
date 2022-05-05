import styled from 'styled-components';

//const correct: any = '#4caf50';
//const wrong: any = '#f44336';
//const userClicked: any = '#f3f3f3';

type ButtonContainerProps = {
  correct: boolean;
  userClicked: boolean;
};

export const ButtonsContainer = styled.div<ButtonContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  button {
    font-size: 1.2rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 10px;
    width: 100%;
    color: #333;
    background: ${({ correct, userClicked }) =>
      correct ? '#4caf80' : !correct && userClicked ? '#f44336' : 'lightblue'};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  }
`;
