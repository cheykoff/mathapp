import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

import { Student } from '../models/student';
import { AppConfig } from '../../appconfig';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // public variables

  totalSessionQuestions: number = AppConfig.quizQuestions;
  countDownStartTime = AppConfig.quizTimeLimit;

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
    levelStars: {
      Addition: [0, 0, 0],
      Subtraktion: [0, 0, 0],
      Multiplikation: [0, 0, 0],
      Division: [0, 0, 0],
      Terme: [0, 0, 0],
    },
  };

  studentId: number;
  schoolClass: number = 5;
  schoolClassName: string = '';
  collectedStars: number = 0;
  possibleStars: number = 0;

  currentLevel = {
    Addition: 1,
    Subtraktion: 1,
    Multiplikation: 1,
    Division: 1,
    Terme: 1,
  };

  mode: string = 'quiz';
  topic: string;
  chosenLevel = 1;

  chapter: number = 0;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;

  // docId: string;
  quizId: string;
  practiceId: string;

  quizStartTime: Date = null;
  quizTemplateIds: string[] = [];

  countDown: Subscription;

  counter = this.countDownStartTime;
  tick = 1000;
  countDownRunning: boolean = false;

  // private variables

  // constructor
  constructor(private _router: Router) {}

  // public methods
  setStudentData(studentData: Student): void {
    this.studentData.id = studentData.id;
    this.studentData.studentId = studentData.studentId;
    this.studentData.schoolClasses = studentData.schoolClasses;
    this.studentData.emailStudent = studentData.emailStudent;
    this.studentData.emailsParents = studentData.emailsParents;
    this.studentData.skillLevel = studentData.skillLevel;
    this.setLevelStars(studentData);

    this.studentData.classId = studentData.classId;

    this.studentData.totalPracticeQuestions =
      studentData.totalPracticeQuestions;
    this.studentData.correctPracticeQuestions =
      studentData.correctPracticeQuestions;
    this.setCurrentLevels();

    this.setLocalStorage();

    this.calculatePossibleStars();
    this.calculateCollectedStars();
  }

  setLocalStorage(): void {
    localStorage.setItem('studentId', this.studentData.studentId.toString());
    localStorage.setItem('studentDocumentId', this.studentData.id);
    localStorage.setItem(
      'studentData.levelStars',
      JSON.stringify(this.studentData.levelStars)
    );
    if (this.studentData.correctPracticeQuestions !== undefined) {
      localStorage.setItem(
        'correctPracticeQuestions',
        this.studentData.correctPracticeQuestions.toString()
      );
    }
    if (this.studentData.totalPracticeQuestions !== undefined) {
      localStorage.setItem(
        'totalPracticeQuestions',
        this.studentData.totalPracticeQuestions.toString()
      );
    }
    localStorage.setItem('topic', this.topic);
    localStorage.setItem('currentLevel', JSON.stringify(this.currentLevel));
    localStorage.setItem('classId', this.studentData.classId);
  }

  calculatePossibleStars(): void {
    this.possibleStars = 15 * 5;
  }

  calculateCollectedStars(): void {
    this.collectedStars = 0;
    for (const topic in this.studentData.levelStars) {
      for (const level in this.studentData.levelStars[topic]) {
        this.collectedStars += this.studentData.levelStars[topic][level];
      }
    }
  }

  getStudentData(): Student {
    return this.studentData;
  }

  setLevelStars(studentData: Student): void {
    if (studentData.levelStars === undefined) {
      this.studentData.levelStars = {
        Addition: [0, 0, 0],
        Subtraktion: [0, 0, 0],
        Multiplikation: [0, 0, 0],
        Division: [0, 0, 0],
        Terme: [0, 0, 0],
      };
    } else {
      for (const key in this.studentData.levelStars) {
        if (this.studentData.levelStars[key] === undefined) {
          this.studentData.levelStars[key] = [0, 0, 0];
        } else {
          this.studentData.levelStars[key] = studentData.levelStars[key];
        }
      }
    }
  }

  reloadStudentData(): void {
    if (
      localStorage.getItem('studentData.levelStars') !== null &&
      localStorage.getItem('studentData.levelStars') !== undefined
    ) {
      const tmpLevelStars = JSON.parse(
        localStorage.getItem('studentData.levelStars')
      );
      for (const key in this.studentData.levelStars) {
        if (this.studentData.levelStars[key] === undefined) {
          this.studentData.levelStars[key] = [0, 0, 0];
        } else {
          this.studentData.levelStars[key] = tmpLevelStars[key];
        }
      }
    }
    this.studentData.id = localStorage.getItem('studentDocumentId');
    this.studentData.studentId = parseInt(localStorage.getItem('studentId'));
    this.studentData.correctPracticeQuestions = parseInt(
      localStorage.getItem('correctPracticeQuestions')
    );
    this.studentData.totalPracticeQuestions = parseInt(
      localStorage.getItem('totalPracticeQuestions')
    );

    if (localStorage.getItem('currentLevel') !== null) {
      this.currentLevel = JSON.parse(localStorage.getItem('currentLevel'));
    }
    // TODO: Retrieve topic when reload
    this.topic = localStorage.getItem('topic');
    this.studentData.skillLevel = parseInt(localStorage.getItem('skillLevel'));
    this.studentData.classId = localStorage.getItem('classId');
  }

  setStudentId(studentId: number): void {
    this.studentData.studentId = studentId;
    return;
  }

  countDownTimer() {
    if (this.countDownRunning === true) {
      return;
    }
    this.countDownRunning = true;
    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      if (this.counter === 0) {
        this._router.navigate(['/', 'resultpage']);
        this.stopCountDownTimer();
      }
    });
  }

  stopCountDownTimer() {
    if (this.countDown) {
      this.countDown.unsubscribe();
    }
    this.countDownRunning = false;
    this.countDown = null;
    this.counter = this.countDownStartTime;
  }

  getStudentId(): number {
    return this.studentData.studentId;
  }

  setStudentDocumentId(data: string): void {
    this.studentData.id = data;
  }

  getStudentDocumentId(): string {
    return this.studentData.id;
  }

  storeStudentIdInLocalStorage(): void {
    localStorage.setItem('studentId', this.getStudentId().toString());
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
    localStorage.setItem('schoolClass', this.schoolClass.toString());
  }

  getSchoolClass(): number {
    return this.schoolClass;
  }

  setMode(data: string): void {
    this.mode = data;
  }

  getMode(): string {
    return this.mode;
  }

  setChapter(data: number): void {
    this.chapter = data;
  }

  getChapter(): number {
    return this.chapter;
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
    for (const topic in this.studentData.levelStars) {
      this.currentLevel[topic] = 1;
      if (this.studentData.levelStars[topic] !== undefined) {
        for (const levelStar of this.studentData.levelStars[topic]) {
          if (levelStar > 0) {
            this.currentLevel[topic]++;
          }
        }
      }
    }
  }

  initializeLevelStars(): void {
    this.studentData.levelStars = {
      Multiplikation: [0, 0, 0],
      Division: [0, 0, 0],
      Addition: [0, 0, 0],
      Subtraktion: [0, 0, 0],
      Terme: [0, 0, 0],
    };
  }

  initializeLevelStarsPerTopic(): void {
    for (const topic in this.studentData.levelStars) {
      if (this.studentData.levelStars[topic] !== undefined) {
      } else {
        this.studentData.levelStars[topic] = [0, 0, 0];
      }
    }
  }

  incrementCorrectAnswer(): void {
    this.correctAnswer++;
  }

  // private methods
}
