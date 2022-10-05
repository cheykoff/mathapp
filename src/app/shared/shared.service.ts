import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // TODO: Should I initialize these variables in the constructor?
  schoolClass: number = 0;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  docId: string = 'ddd';
  sessionId: string = '';
  quizId: string = 'kwhVeGouM3tDJvJMucxi'; // Default quizId that catches all answers that somehow don't got the quizId (startTime is set to 1.1.2022)
  parameters = {};
  studentId: number = Math.floor(100000 + Math.random() * 900000);

  constructor() {}

  setStudentId(data: number): void {
    // this.studentId = data;
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

  setDocId(data: string): void {
    this.docId = data;
  }

  getDocId(): string {
    return this.docId;
  }

  setSessionId(data?: string): void {
    if (this.sessionId === '') {
      this.sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
      return;
    }
    this.sessionId = data;
  }

  getSessionId(): string {
    return this.sessionId;
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
  /*
  resetLocalStorage(): void {
    localStorage.setItem('quizId', '');
    // localStorage.setItem('sessionId', '');
    localStorage.setItem('correctAnswer', '');
    localStorage.setItem('incorrectAnswer', '');
    localStorage.setItem('currentQuestion', '');
  }
  */
}
