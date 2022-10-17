export interface Exercise {
  id: string;
  question: string;
  answerOptions: [{ answerText: string; isCorrect: boolean }];
  classLevel: number;
  orderNumber: number;
  questionNumber: number;
  chapterNumber: number;
  chapterName: string;
  topicNumber: number;
  topicName: string;
  testNumber: number;
}
