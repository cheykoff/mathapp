import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // TODO: Should I initialize these variables in the constructor?
  schoolClass: number = 0;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  points: number = 0;
  docId: string = '';
  sessionId: string = '';
  quizId: string = '';
  parameters = {};

  constructor() {}

  setPoints(data: any): void {
    this.points = data;
  }

  getPoints(): number {
    return this.points;
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

  setSessionId(): void {
    this.sessionId = 'session_' + Math.random().toString(36).substr(2, 9); // TODO: Should I just use the firebase id?
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
}
