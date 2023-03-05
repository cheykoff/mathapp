import { Quiz } from './quiz';

export interface QuizRecord {
  quiz: Quiz;
  startTime: Date;
  endTime: Date;
  correctAnswers: number;
  incorrectAnswers: number;
  streakCount: number;
  currentQuestion: number;
}
