export interface Exercise2 {
  id: string;
  question: string;
  answerType: string;
  answerOptions?: [{ answerText: string; isCorrect: boolean }];
  correctAnswer?: string;
  denominator?: string;
  numerator?: string;
  classLevel?: number;
  orderNumber?: number;
  questionNumber?: number;
  chapterNumber?: number;
  chapterName?: string;
  topicNumber?: number;
  topicName?: string;
  testNumber?: number;
}
