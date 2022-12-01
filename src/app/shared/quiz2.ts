export interface Quiz2 {
  id: string;
  exerciseIds: [string];
  classLevel?: number;
  dynamicQuestions?: boolean;
  maxQuestions?: number;
  maxTime?: number;
  orderedQuestions?: boolean;
  books?: [
    { bookId: string; chapters: [{ chapter: number; subchapters: [number] }] }
  ];
}
