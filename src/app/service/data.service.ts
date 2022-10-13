import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { Observable, map } from 'rxjs';

import { Exercise } from '../shared/exercise';
import { Puzzle } from '../shared/puzzle';
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
      });
  }

  updateStudentId(studentId: number) {
    this._store.doc(`/sessions/${this._shared.getSessionId()}`).update({
      studentId: studentId,
    });
  }

  storeMode(mode: string): void {
    this._store.doc(`/sessions/${this._shared.getSessionId()}`).update({
      mode: mode,
    });
  }

  storeSchoolClass(className: number) {
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
  }

  storeAnswer(
    exerciseId: string,
    answerIsCorrect: boolean,
    duration: number,
    attempts: number
  ) {
    if (attempts === 1) {
      this._store
        .collection(`quizzes/${this._shared.getQuizId()}/answers`)
        .add({
          startTime: serverTimestamp(),
          exerciseId: exerciseId,
          answerIsCorrect: answerIsCorrect,
          duration: duration,
          studentId: this._shared.getStudentId(),
          sessionId: this._shared.getSessionId(),
          quizId: this._shared.getQuizId(),
        });
    }
  }

  storePuzzleAnswer(puzzleId: string, duration: number, attempts: number) {
    this._store
      .collection(`quizzes/${this._shared.getQuizId()}/puzzleanswers`)
      .add({
        startTime: serverTimestamp(),
        attempts: attempts,
        duration: duration,
        puzzleId: puzzleId,
      });
  }

  storeResult() {
    this._store.doc(`/quizzes/${this._shared.getQuizId()}`).update({
      correctAnswers: this._shared.correctAnswer,
      totalQuestions: this._shared.correctAnswer + this._shared.incorrectAnswer,
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
}
