import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  schoolClass: number = 0;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  points: number = 0;
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
    console.log('shared servive - schoolClass: ' + this.schoolClass);
  }

  getSchoolClass() {
    return this.schoolClass;
  }
}
