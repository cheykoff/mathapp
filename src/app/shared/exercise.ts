export interface Exercise {
  id: string;
  question: string;
  answerOptions: [{ answerText: string; isCorrect: boolean }];
  classLevel: number;
  orderNumber: number;
}
