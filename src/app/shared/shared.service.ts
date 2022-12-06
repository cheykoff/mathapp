import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';

import { DataService } from '../service/data.service';

import { Student } from '../shared/student';

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
  studentId: number = 100000;
  correctPuzzles: number = 0;
  incorrectPuzzles: number = 0;
  testNumber: number = 0;
  quizFinished: boolean = false;
  quizStartTime: Date = null;
  studentDocumentId: string = 'abc';

  countDown: Subscription;
  counter = 1800; // 1800 s = 30 minutes
  tick = 1000;

  currentLevel = 1;
  chosenLevel = 1;
  levelStars: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private _router: Router) {}

  countDownTimer() {
    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      if (this.counter === 0) {
        this.quizFinished = true;
        this._router.navigate(['/', 'levelpage']);
        // this.showResult();
        this.countDown.unsubscribe();
        this.countDown = null;
      }
    });
  }
  /*
  getStudentDocumentId(): void {
    this._data.getStudentDocumentIds().subscribe((data: Student[]) => {
      this.studentDocumentId = data[0].id;
    });
  }
  */
  /*
  getStudentDocumentId(): void {
    this.studentDocumentId = 'BbWzvQmUIMpytT5G5bUI';
  }

  */
  showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }

  // called from login
  setStudentId(studentId: number): void {
    this.studentId = studentId;
    // this.studentId = Math.floor(100000 + Math.random() * 900000);
    return;
    if (this.studentId === 100000 || !this.studentId) {
      if (localStorage.getItem('studentId')) {
        this.studentId = parseInt(localStorage.getItem('studentId'));
        return;
      }
      this.studentId = Math.floor(100000 + Math.random() * 900000);
    }
    localStorage.setItem('studentId', this.studentId.toString());
  }

  // called from login
  setStudentDocumentId(data: string): void {
    this.studentDocumentId = data;
    console.log('synchronous');
    console.log('this.shared.studentDocumentId: ' + this.studentDocumentId);
    setTimeout(() => {
      console.log('after 1 second');
      console.log('this.shared.studentDocumentId: ' + this.studentDocumentId);
    }, 1000);
  }

  getStudentDocumentId(): string {
    return this.studentDocumentId;
  }

  storeStudentIdInLocalStorage(): void {
    localStorage.setItem('studentId', this.getStudentId().toString());
  }

  getStudentId(): number {
    return this.studentId;
    /*
    if (localStorage.getItem('studentId')) {
      return parseInt(localStorage.getItem('studentId'));
    } else {
    }
    */
  }

  setQuizStartTime(data: any) {
    this.quizStartTime = data;
  }

  getQuizStartTime(): any {
    return this.quizStartTime;
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
