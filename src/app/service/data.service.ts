import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { Observable, map } from 'rxjs';

import { Exercise } from '../shared/exercise';
import { Exercise2 } from '../shared/exercise2';
import { Puzzle } from '../shared/puzzle';
import { Fraction } from '../shared/fraction';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private _store: AngularFirestore,
    private _shared: SharedService
  ) {}

  storeSessionId() {
    this._store
      .collection(`sessions`)
      .add({
        url: window.location.href,
        startTime: serverTimestamp(),
        studentId: this._shared.getStudentId(),
      })
      .then((docRef) => {
        this._shared.setSessionId(docRef.id);
      })
      .then(() => {
        localStorage.setItem('sessionId', this._shared.getSessionId());
        localStorage.setItem(
          'studentId',
          this._shared.getStudentId().toString()
        );
      });
  }

  updateStudentId() {
    this._store
      .doc(`/sessions/${this._shared.getSessionId()}`)
      .update({
        studentId: this._shared.studentId,
      })
      .then(() => {
        localStorage.setItem(
          'studentId',
          this._shared.getStudentId().toString()
        );
      });
  }

  storeMode(mode: string): void {
    this._store.doc(`/sessions/${this._shared.getSessionId()}`).update({
      mode: mode,
    });
  }

  storeSchoolClass(className: number) {
    console.log('data.service.ts: storeSchoolClass');
    this._store
      .collection(`quizzes`)
      .add({
        schoolClass: className,
        sessionId: this._shared.getSessionId(),
        url: window.location.href,
        startTime: serverTimestamp(),
        studentId: this._shared.getStudentId(),
      })
      .then((docRef) => {
        this._shared.setQuizId(docRef.id);
      });
    localStorage.setItem(
      'schoolClass',
      this._shared.getSchoolClass().toString()
    );
  }

  storeAnswer(
    exerciseId: string,
    answerIsCorrect: boolean,
    duration: number,
    attempts: number
  ) {
    console.log('data.service.ts: storeAnswer');
    console.log(this._shared.getQuizId());

    this._store.collection(`quizzes/${this._shared.getQuizId()}/answers`).add({
      startTime: serverTimestamp(),
      exerciseId: exerciseId,
      answerIsCorrect: answerIsCorrect,
      duration: duration,
      studentId: this._shared.getStudentId(),
      sessionId: this._shared.getSessionId(),
      quizId: this._shared.getQuizId(),
    });
  }

  storePuzzleAnswer(
    puzzleId: string,
    duration: number,
    // firstTryDuration: number,
    attempts: number
    // wrongAnswers: any[]
  ) {
    this._store
      .collection(`quizzes/${this._shared.getQuizId()}/puzzleanswers`)
      .add({
        startTime: serverTimestamp(),
        attempts: attempts,
        duration: duration,
        // firstTryDuration: firstTryDuration,
        puzzleId: puzzleId,
        studentId: this._shared.getStudentId(),
        sessionId: this._shared.getSessionId(),
        quizId: this._shared.getQuizId(),
        // wrongAnswers: wrongAnswers,
      });
  }

  storeResult() {
    this._store.doc(`/quizzes/${this._shared.getQuizId()}`).update({
      correctAnswers: this._shared.correctAnswer,
      totalQuestions: this._shared.correctAnswer + this._shared.incorrectAnswer,
      correctPuzzles: this._shared.correctPuzzles,
      totalPuzzles: this._shared.correctPuzzles + this._shared.incorrectPuzzles,
      endTime: serverTimestamp(),
    });
  }

  addEndTime() {
    this._store.doc(`/sessions/${this._shared.getSessionId()}`).update({
      endTime: serverTimestamp(),
    });
  }

  getAllExercises(classLevel: number): Observable<Exercise[]> {
    return this._store
      .collection('exercises', (ref) =>
        ref
          .where('classLevel', '<=', classLevel)
          .orderBy('classLevel')
          .orderBy('orderNumber')
          .limit(20)
      )
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }

  getAllExercisesByTestNumber(testNumber: number): Observable<Exercise[]> {
    return this._store
      .collection('exercises2', (ref) =>
        ref
          .where('testNumber', '==', testNumber)
          .orderBy('classLevel')
          .orderBy('chapterNumber')
          .orderBy('topicNumber')
          .orderBy('questionNumber')
      )
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }

  getAllExercisesByClassLevel(): Observable<Exercise[]> {
    if (this._shared.schoolClass === 5) {
      // First test per schoolClass (prototype)
      if (this._shared.testNumber === 1) {
        return this._store
          .collection('exercises', (ref) =>
            ref
              .where('classLevel', '<=', this._shared.schoolClass)
              .orderBy('classLevel')
              .orderBy('orderNumber')
              .limit(20)
          )
          .get()
          .pipe(map((result) => convertSnaps<Exercise>(result)));
      } else if (this._shared.testNumber === 2) {
        // Second test per schoolClass (prototype)
        return this._store
          .collection('exercises2', (ref) =>
            ref
              .where('testNumber', '==', 2)
              .orderBy('classLevel')
              .orderBy('chapterNumber')
              .orderBy('topicNumber')
              .orderBy('questionNumber')
          )
          .get()
          .pipe(map((result) => convertSnaps<Exercise>(result)));
      } else if (this._shared.testNumber === 3) {
        // Third test per schoolClass (prototype)
        return this._store
          .collection('exercises3', (ref) =>
            ref
              .where('testNumber', '==', 3)
              .orderBy('classLevel')
              .orderBy('chapterNumber')
              .orderBy('topicNumber')
              .orderBy('questionNumber')
          )
          .get()
          .pipe(map((result) => convertSnaps<Exercise>(result)));
      }
    } else if (this._shared.schoolClass === 6) {
      return this._store
        .collection('exercises6', (ref) =>
          ref
            .orderBy('classLevel')
            .orderBy('chapterNumber')
            .orderBy('topicNumber')
            .orderBy('questionNumber')
            .limit(5)
        )
        .get()
        .pipe(map((result) => convertSnaps<Exercise>(result)));
    }
    return this._store
      .collection('exercises', (ref) =>
        ref
          .where('classLevel', '<=', this._shared.schoolClass)
          .orderBy('classLevel')
          .orderBy('orderNumber')
          .limit(5)
      )
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }

  getAllPuzzles(classLevel: number): Observable<Puzzle[]> {
    return this._store
      .collection('puzzles', (ref) =>
        ref
          .where('classLevel', '<=', classLevel)
          .orderBy('classLevel')
          .orderBy('orderNumber')
      )
      .get()
      .pipe(map((result) => convertSnaps<Puzzle>(result)));
  }

  getFractions(): Observable<Fraction[]> {
    return this._store
      .collection('fractions')
      .get()
      .pipe(map((result) => convertSnaps<Fraction>(result)));
  }

  getAllPuzzles3(classLevel: number): Observable<Puzzle[]> {
    return this._store
      .collection('puzzles3', (ref) =>
        ref
          .where('classLevel', '<=', classLevel)
          .orderBy('classLevel')
          .orderBy('orderNumber')
      )
      .get()
      .pipe(map((result) => convertSnaps<Puzzle>(result)));
  }

  getAllExercises2(): Observable<Exercise2[]> {
    return this._store
      .collection('exercises-all')
      .get()
      .pipe(map((result) => convertSnaps<Exercise2>(result)));
  }
}
