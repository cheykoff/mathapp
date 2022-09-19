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

  setSessionId() {
    this.sessionId = 'session_' + Math.random().toString(36).substr(2, 9); // TODO: Should I just use the firebase id?
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

  setParameters() {
    let paramString = window.location.href.split('?')[1];
    if (paramString) {
      this.parameters = paramString.split('&');
    }
  }

  getParameters() {
    if (Object.keys(this.parameters).length) {
      return this.parameters;
    } else {
      return null;
    }
  }
}
