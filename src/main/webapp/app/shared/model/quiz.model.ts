import { ICustomer } from 'app/shared/model/customer.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IQuiz {
  id?: number;
  quizName?: string;
  code?: string;
  timeBegin?: string;
  timeEnd?: string;
  duration?: number;
  subjectSubjectName?: string;
  subjectId?: number;
  customers?: ICustomer[];
  questions?: IQuestion[];
}

export const defaultValue: Readonly<IQuiz> = {};
