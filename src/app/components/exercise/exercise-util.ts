import { Exercise } from './exercise';

export function shuffleExercises(exercises: Exercise[]): Exercise[] {
  for (let i = exercises.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [exercises[i], exercises[j]] = [exercises[j], exercises[i]];
  }
  return exercises;
}

export function getRandInteger(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}
