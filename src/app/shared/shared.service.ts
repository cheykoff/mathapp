import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  schoolClass: number = 0;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  docId: string = 'mjAHUQYd5uc3Bt4jWUpQ'; // Default id for session (startTime is set to 1.1.2022, studentId is 111111)
  sessionId: string = '';
  quizId: string = 'kwhVeGouM3tDJvJMucxi'; // Default quizId that catches all answers that somehow don't got the quizId (startTime is set to 1.1.2022)
  parameters = {};
  studentId: number = Math.floor(100000 + Math.random() * 900000);
  correctPuzzles: number = 0;
  incorrectPuzzles: number = 0;

  constructor() {}

  setStudentId(data: number): void {
    if (localStorage.getItem('studentId')) {
      return;
    }
    localStorage.setItem('studentId', this.studentId.toString());
  }

  getStudentId(): number {
    if (localStorage.getItem('studentId')) {
      return parseInt(localStorage.getItem('studentId'));
    } else {
      return this.studentId;
    }
  }

  setCorrectAnswer(data: any): void {
    this.correctAnswer = data;
  }

  getCorrectAnswer(): number {
    return this.correctAnswer;
  }

  setIncorrectAnswer(data: any): void {
    this.incorrectAnswer = data;
  }

  getIncorrectAnswer(): number {
    return this.incorrectAnswer;
  }

  setSchoolClass(data: number): void {
    this.schoolClass = data;
  }

  getSchoolClass(): number {
    return this.schoolClass;
  }

  setSessionId(data: string): void {
    this.docId = data;
  }

  getSessionId(): string {
    return this.docId;
  }

  setQuizId(data: string): void {
    this.quizId = data;
  }

  getQuizId(): string {
    return this.quizId;
  }

  setParameters(): void {
    let paramString = window.location.href.split('?')[1];
    if (paramString) {
      this.parameters = paramString.split('&');
    }
  }

  getParameters(): any {
    if (Object.keys(this.parameters).length) {
      return this.parameters;
    } else {
      return null;
    }
  }
}
