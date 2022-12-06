export interface QuizTemplate {
  id: string;
  books?: [
    { bookId: string; chapters: [{ chapter: number; subChapters: number[] }] }
  ];
  classLevel?: number;
  dynamicQuestion?: boolean;
  exerciseIds: string[];
  maxQuestions?: number;
  maxTime?: number;
  activeTimeframe: Date[];
}
