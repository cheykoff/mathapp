export interface SchoolClass2 {
  id: string;
  schoolId: string;
  schoolYear: string;
  classLevel: number;
  className: string;
  quizTemplateIds: [string];
  studentIds: [{ status: string; studentId: string }];
  teacherIds: [{ status: string; studentId: string }];
}
