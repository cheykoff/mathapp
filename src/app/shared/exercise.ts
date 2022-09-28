export interface Exercise {
  id: string;
  question: string;
  answerOptions: [{ answerText: string; isCorrect: boolean }];
  classLevel: number;
  orderNumber: number;
}

// TODO: refactor to have correctAnswer and incorrectAnswers[]
// TODO: refactor to use strings for answers
