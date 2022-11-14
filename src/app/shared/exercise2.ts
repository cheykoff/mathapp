export interface Exercise2 {
  id: string;
  question: string;
  answerType?: string;
  correctAnswer?: string | { numerator: string; denominator: string };
  incorrectAnswers?: [string];
  answerOptions?: [{ answerText: string; isCorrect: boolean }];
  classLevel?: number;
  books?: [
    {
      bookId: string;
      chapter?: number;
      subchapter?: number;
      page?: number;
      questionNumber?: number;
    }
  ];
}
