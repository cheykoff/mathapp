import { Exercise } from './exercise';

import { groupBy } from 'lodash';

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

type GroupByKeys = keyof Pick<Exercise, 'chapter' | 'difficulty'>;

// Define a custom groupBy function that groups by multiple properties
function groupByMultiple<T>(
  array: T[],
  keys: (keyof T)[]
): Record<string, T[]> {
  const groups = groupBy(array, (item: T) =>
    keys.map((key) => item[key]).join('|')
  );
  return groups;
}

// Shuffle an array in place
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle the exercises by chapter and difficulty level
export function shuffleExercises2(exercises: Exercise[]): Exercise[] {
  // Group the exercises by chapter and difficulty level
  const groups = groupByMultiple(exercises, ['chapter', 'difficulty']);

  // Shuffle each group individually
  for (const group of Object.values(groups)) {
    shuffleArray(group);
  }

  // Combine the shuffled groups back into a single array
  const shuffledExercises = Object.values(groups).flat();

  return shuffledExercises;
}
