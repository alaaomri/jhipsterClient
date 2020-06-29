import { IQuestion } from 'app/shared/model/question.model';
import { ISubject } from 'app/shared/model/subject.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IQuiz {
  id?: number;
  quizName?: string;
  code?: string;
  timeBegin?: string;
  timeEnd?: string;
  duration?: number;
  questions?: IQuestion[];
  subjects?: ISubject[];
  customers?: ICustomer[];
}

export const defaultValue: Readonly<IQuiz> = {};
