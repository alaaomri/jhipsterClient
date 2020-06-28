import { IQuiz } from 'app/shared/model/quiz.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface ICustomer {
  id?: number;
  gender?: Gender;
  phone?: string;
  birthDate?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  userLogin?: string;
  userId?: number;
  quizzes?: IQuiz[];
}

export const defaultValue: Readonly<ICustomer> = {};
