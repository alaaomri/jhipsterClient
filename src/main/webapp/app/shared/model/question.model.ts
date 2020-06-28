import { IQuiz } from 'app/shared/model/quiz.model';
import { IAnswer } from 'app/shared/model/answer.model';

export interface IQuestion {
  id?: number;
  code?: string;
  question?: string;
  quizzes?: IQuiz[];
  answers?: IAnswer[];
}

export const defaultValue: Readonly<IQuestion> = {};
