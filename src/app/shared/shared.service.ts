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
    totalPracticeQuestions: 0,
    correctPracticeQuestions: 0,
    classId: '',
  };

  quizTemplates: QuizTemplate[] = [];

  mode: string = 'quiz';
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
  schoolClassName: string = '';
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  docId: string;
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

  setStudentData(studentData: Student): void {
    this.studentData.id = studentData.id;
    this.studentData.studentId = studentData.studentId;
    this.studentData.schoolClasses = studentData.schoolClasses;
    this.studentData.emailStudent = studentData.emailStudent;
    this.studentData.emailsParents = studentData.emailsParents;
    this.studentData.skillLevel = studentData.skillLevel;
    this.levelStars = studentData.levelStars;
    this.studentData.classId = studentData.classId;

    this.studentData.totalPracticeQuestions =
      studentData.totalPracticeQuestions;
    this.studentData.correctPracticeQuestions =
      studentData.correctPracticeQuestions;
    this.setCurrentLevels();

    localStorage.setItem('studentId', this.studentData.studentId.toString());
    localStorage.setItem('studentDocumentId', this.studentData.id);
    localStorage.setItem('levelStars', JSON.stringify(this.levelStars));
    localStorage.setItem(
      'correctPracticeQuestions',
      this.studentData.correctPracticeQuestions.toString()
    );
    localStorage.setItem(
      'totalPracticeQuestions',
      this.studentData.totalPracticeQuestions.toString()
    );
    localStorage.setItem('currentLevel', JSON.stringify(this.currentLevel));
    localStorage.setItem('classId', this.studentData.classId);
  }

  reloadStudentData(): void {
    this.studentData.id = localStorage.getItem('studentDocumentId');
    this.studentData.studentId = parseInt(localStorage.getItem('studentId'));
    this.levelStars = JSON.parse(localStorage.getItem('levelStars'));
    this.studentData.correctPracticeQuestions = parseInt(
      localStorage.getItem('correctPracticeQuestions')
    );
    this.studentData.totalPracticeQuestions = parseInt(
      localStorage.getItem('totalPracticeQuestions')
    );
    this.currentLevel = JSON.parse(localStorage.getItem('currentLevel'));
    this.studentData.skillLevel = parseInt(localStorage.getItem('skillLevel'));
    this.studentData.classId = localStorage.getItem('classId');
  }

  // called from login
  setStudentId(studentId: number): void {
    this.studentId = studentId;
    return;
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

  // called from app.component, codepage, data.service
  getStudentId(): number {
    return this.studentId;
  }
  setStudentDocumentId(data: string): void {
    this.studentData.id = data;
  }
  // called from login and data.service
  getStudentDocumentId(): string {
    return this.studentData.id;
  }

  storeStudentIdInLocalStorage(): void {
    localStorage.setItem('studentId', this.getStudentId().toString());
  }

  setSchoolClassDocumentId(data: string): void {
    this.schoolClassDocumentId = data;
    return;
  }

  getSchoolClassDocumentId(): string {
    return this.schoolClassDocumentId;
  }

  setQuizTemplateIds(data: string[]): void {
    this.quizTemplateIds = data;
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

  setSchoolClassName(data: string): void {
    this.schoolClassName = data;
  }

  getSchoolClassName(): string {
    return this.schoolClassName;
  }

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

  setCurrentLevels(): void {
    let testLevel = {
      a: 1,
      b: 1,
      c: 1,
    };
    const testObject = {
      a: [5, 4, 3],
      b: [2, 1, 0],
      c: [0, 0, 0],
    };
    for (const topic in testObject) {
      for (const levelStar of testObject[topic]) {
        if (levelStar > 0) {
          testLevel[topic]++;
        }
      }
    }
    this.initializeCurrentLevels();

    for (const topic in this.levelStars) {
      this.currentLevel[topic] = 1;
      for (const levelStar of this.levelStars[topic]) {
        if (levelStar > 0) {
          this.currentLevel[topic]++;
        }
      }
    }
  }

  initializeCurrentLevels(): void {
    this.currentLevel = {
      Multiplikation: 1,
      Division: 1,
      Addition: 1,
      Subtraktion: 1,
    };
  }

  initializeLevelStars(): void {
    this.levelStars = {
      Multiplikation: [0, 0, 0],
      Division: [0, 0, 0],
      Addition: [0, 0, 0],
      Subtraktion: [0, 0, 0],
    };
  }
}
