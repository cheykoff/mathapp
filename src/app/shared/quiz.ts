export interface Quiz {
  id: string;
  name?: string;
  quizNumber?: number;
  startTime?: Date;
  endTime?: Date;
  attempts?: number;
  disabled?: boolean;
  completed?: boolean;
}
