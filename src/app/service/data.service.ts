import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { Observable, map } from 'rxjs';

import { Exercise } from '../shared/exercise';
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

  getAllExercises(): Observable<Exercise[]> {
    return this._store
      .collection('exercises-all')
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }
}
