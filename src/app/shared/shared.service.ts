import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  schoolClass: number = 0;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  points: number = 0;
  docId: string = '';
  sessionId: string = '';
  quizId: string = '';

  constructor() {}

  setPoints(data: any) {
    this.points = data;
  }

  getPoints() {
    return this.points;
  }

  setCorrectAnswer(data: any) {
    this.correctAnswer = data;
  }

  getCorrectAnswer() {
    return this.correctAnswer;
  }

  setIncorrectAnswer(data: any) {
    this.incorrectAnswer = data;
  }

  getIncorrectAnswer() {
    return this.incorrectAnswer;
  }

  setSchoolClass(data: number) {
    this.schoolClass = data;
  }

  getSchoolClass() {
    return this.schoolClass;
  }

  setDocId(data: string) {
    this.docId = data;
  }

  getDocId() {
    return this.docId;
  }

  setSessionId(data: string) {
    this.sessionId = data;
  }

  getSessionId() {
    return this.sessionId;
  }

  setQuizId(data: string) {
    this.quizId = data;
  }

  getQuizId() {
    return this.quizId;
  }
}
