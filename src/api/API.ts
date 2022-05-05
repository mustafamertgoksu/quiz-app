import axios from 'axios';
import { shuffleArray } from '../utils/util';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export const getQuestions = async (amount: number, difficulty: Difficulty) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const response = await axios.get(url);
  return response.data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
  /* Fetch: const response = await (await fetch(url)).json();
       console.log(response)
       return response.results.map((question: Question) => ({
           ...question,
           answers: shuffleArray([
               ...question.incorrect_answers,
               question.correct_answer
           ])
       }
       )); */
};
