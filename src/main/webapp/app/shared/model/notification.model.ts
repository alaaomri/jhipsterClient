export interface INotification {
  id?: number;
  date?: string;
  details?: string;
  sentDate?: string;
  isOpened?: boolean;
  userLogin?: string;
  userId?: number;
  quizCode?: string;
  quizId?: number;
}

export const defaultValue: Readonly<INotification> = {
  isOpened: false,
};
