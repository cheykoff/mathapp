export interface Student {
  id: string;
  studentId: number;
  totalQuestions?: number;
  correctAnswers?: number;
  emailStudent?: string;
  emailsParents?: [string];
  schoolClasses?: [{ classId: string; currentClass: boolean }];
  skillLevel?: number;
}
