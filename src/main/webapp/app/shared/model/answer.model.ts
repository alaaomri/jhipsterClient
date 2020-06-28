import { IQuestion } from 'app/shared/model/question.model';

export interface IAnswer {
  id?: number;
  code?: string;
  answer?: string;
  questions?: IQuestion[];
}

export const defaultValue: Readonly<IAnswer> = {};
