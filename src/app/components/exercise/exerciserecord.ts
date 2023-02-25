import { Exercise } from '../../shared/exercise';

export interface ExerciseRecord {
  exercise: Exercise;
  duration: number;
  attempts: number;
  answerIsCorrect: boolean;
}
