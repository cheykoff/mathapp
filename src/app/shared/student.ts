export interface Student {
  id: string;
  studentId: number;
  totalQuestions?: number;
  correctAnswers?: number;
  emailStudent?: string;
  emailsParents?: [string];
  schoolClasses?: [{ classId: string; currentClass: boolean }];
  skillLevel?: number;
  levelStars?: {
    Addition: [number];
    Subtraktion: [number];
    Multiplikation: [number];
    Division: [number];
  };
}
