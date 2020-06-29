import { IQuiz } from 'app/shared/model/quiz.model';

export interface ISubject {
  id?: number;
  code?: string;
  subjectName?: string;
  quizzes?: IQuiz[];
}

export const defaultValue: Readonly<ISubject> = {};
