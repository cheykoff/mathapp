import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';

import { DataService } from '../service/data.service';

import { Student } from '../shared/student';
import { QuizTemplate } from './quiz-template';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  studentData: Student = {
    id: '',
    studentId: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    emailStudent: '',
    emailsParents: [''],
    schoolClasses: [{ classId: '', currentClass: false }],
    skillLevel: 0,
  };

  quizTemplates: QuizTemplate[] = [];

  mode: string;
  topic: string;

  currentLevel = {
    Addition: 1,
    Subtraktion: 1,
    Multiplikation: 1,
    Division: 1,
  };
  chosenLevel = 1;

  levelStars = {
    Addition: [0, 0, 0],
    Subtraktion: [0, 0, 0],
    Multiplikation: [0, 0, 0],
    Division: [0, 0, 0],
  };

  currentLevelStars: number;

  schoolClass: number = 0;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  docId: string;
  // sessionId: string = '';
  quizId: string;
  practiceId: string;
  parameters = {};
  studentId: number = 100000;
  correctPuzzles: number = 0;
  incorrectPuzzles: number = 0;
  testNumber: number = 0;
  quizFinished: boolean = false;
  quizStartTime: Date = null;
  schoolClassDocumentId: string;
  quizTemplateIds: string[] = [];

  countDown: Subscription;
  counter = 1800; // 1800 s = 30 minutes
  tick = 1000;
  constructor(private _router: Router) {}

  // called from login
  setStudentId(studentId: number): void {
    this.studentId = studentId;
    // this.studentId = Math.floor(100000 + Math.random() * 900000);
    return;
    /*
    if (this.studentId === 100000 || !this.studentId) {
      if (localStorage.getItem('studentId')) {
        this.studentId = parseInt(localStorage.getItem('studentId'));
        return;
      }
      this.studentId = Math.floor(100000 + Math.random() * 900000);
    }
    localStorage.setItem('studentId', this.studentId.toString());
    */
  }

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

  showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }

  setStudentData(studentData: Student): void {
    console.log('setStudentData()');
    this.studentData.id = studentData.id;
    this.studentData.studentId = studentData.studentId;
    this.studentData.correctAnswers = studentData.correctAnswers;
    this.studentData.totalQuestions = studentData.totalQuestions;
    this.studentData.schoolClasses = studentData.schoolClasses;
    this.studentData.emailStudent = studentData.emailStudent;
    this.studentData.emailsParents = studentData.emailsParents;
    this.studentData.skillLevel = studentData.skillLevel;
    this.levelStars = studentData.levelStars;
    this.setCurrentLevels();
    console.log('studentData');
    console.log(this.studentData);
    console.log('levelStars');
    console.log(this.levelStars);
    console.log(this.currentLevel);
  }

  // called from codepage
  // TODO: call from quiz-intro
  // TODO: Fix error

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

  // called from exercise
  // TODO: just use router in the button

  // called from app.component, codepage, data.service
  getStudentId(): number {
    return this.studentId;
    /*
    if (localStorage.getItem('studentId')) {
      return parseInt(localStorage.getItem('studentId'));
    } else {
    }
    */
  }

  // called from login

  // called from login and data.service
  getStudentDocumentId(): string {
    return this.studentData.id;
  }
  /*
  updateLevelStars(stars: number) {
    console.log('old stars: ' + this.levelStars.addition[this.chosenLevel - 1]);
    this.levelStars[this.topic][this.chosenLevel - 1] = stars;
    console.log('new stars: ' + this.levelStars.addition[this.chosenLevel - 1]);
    console.log('this.levelStars: ' + this.levelStars);
  }
  */

  // TODO: Store all important variables in local storage
  storeStudentIdInLocalStorage(): void {
    localStorage.setItem('studentId', this.getStudentId().toString());
  }

  setSchoolClassDocumentId(data: string): void {
    this.schoolClassDocumentId = data;
    console.log(
      'this.schoolClassDocumentId (syncronous): ' + this.schoolClassDocumentId
    );
    setTimeout(() => {
      console.log(
        'this.shared.schoolClassDocumentId (1 s delay): ' +
          this.schoolClassDocumentId
      );
    }, 1000);
    return;
  }

  getSchoolClassDocumentId(): string {
    return this.schoolClassDocumentId;
  }

  setQuizTemplateIds(data: string[]): void {
    this.quizTemplateIds = data;
    console.log('this.quizTemplateIds (syncronous): ' + this.quizTemplateIds);
    setTimeout(() => {
      console.log('this.quizTemplateIds (1 s delay): ' + this.quizTemplateIds);
    }, 1000);
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
  /*
  setSessionId(data: string): void {
    this.docId = data;
  }

  getSessionId(): string {
    return this.docId;
  }
  */

  setQuizId(data: string): void {
    this.quizId = data;
  }

  getQuizId(): string {
    return this.quizId;
  }

  setPracticeId(data: string): void {
    this.practiceId = data;
  }

  getPracticeId(): string {
    return this.practiceId;
  }

  /*
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
  */

  setCurrentLevels(): void {
    for (const topic in this.levelStars) {
      for (const levelRating of this.levelStars[topic]) {
        if (levelRating > 0) {
          this.currentLevel[topic]++;
        }
      }
    }
  }
}
