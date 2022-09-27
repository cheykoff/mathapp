export interface Exercise {
  id: string;
  question: string;
  correctAnswer: number;
  answers: number[];
  classLevel: number;
  orderNumber: number;
}

// TODO: refactor to have correctAnswer and incorrectAnswers[]
// TODO: refactor to use strings for answers
