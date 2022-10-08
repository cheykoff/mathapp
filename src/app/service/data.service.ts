import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // TODO: Not used
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { CollectionReference, serverTimestamp } from 'firebase/firestore';
import { Observable, map } from 'rxjs';

import { Exercise } from '../shared/exercise';
import { Puzzle } from '../shared/puzzle';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // col = collection(this._store, 'sessions');
  constructor(
    private _store: AngularFirestore,
    private _store2: Firestore,
    private _shared: SharedService // private _store: Firestore //private _col: collection
  ) {}
  /*
  storeTest() {
    this._store2.collection(`tests`).add({
      test: 'test',
    });
  }
  */

  storeSessionId() {
    this._store.collection(`sessions`).add({
      sessionId: this._shared.getSessionId(),
      url: window.location.href,
      startTime: serverTimestamp(),
      // parameters: this._shared.getParameters(),
      studentId: this._shared.getStudentId(),
    });

    this._store // TODO: Get exactly the right document
      .collection('sessions', (ref) =>
        ref.where('sessionId', '==', this._shared.getSessionId())
      )
      .get()
      .subscribe((snap) => {
        this._shared.setDocId(snap.docs[0].id); // Is there a better solution?
      });
  }

  storeMode(mode: string): void {
    this._store.doc(`/sessions/${this._shared.getDocId()}`).update({
      // this._store.doc(`/sessions/fff`).update({
      mode: mode,
    });
  }

  storeSchoolClass(className: number) {
    this._store.collection(`quizzes`).add({
      schoolClass: className,
      sessionId: this._shared.getSessionId(),
      url: window.location.href,
      startTime: serverTimestamp(),
      studentId: this._shared.getStudentId(),
    });
  }

  storeQuizId() {
    this._store
      .collection('quizzes', (ref) =>
        ref
          .where('sessionId', '==', this._shared.getSessionId())
          .orderBy('startTime', 'desc')
          .limit(1)
      )
      .get()
      .subscribe((snap) => {
        this._shared.setQuizId(snap.docs[0].id);
      });
  }

  storeAnswer(exerciseId: string, answerIsCorrect: boolean, duration: number) {
    this._store.collection(`quizzes/${this._shared.getQuizId()}/answers`).add({
      startTime: serverTimestamp(),
      exerciseId: exerciseId,
      answerIsCorrect: answerIsCorrect,
      duration: duration,
      studentId: this._shared.getStudentId(),
      sessionId: this._shared.getSessionId(),
    });
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

  getAllExercises(classLevel: number): Observable<Exercise[]> {
    return this._store
      .collection('exercises', (ref) =>
        ref
          .where('classLevel', '<=', classLevel)
          .orderBy('classLevel')
          .orderBy('orderNumber')
      )
      .get() // return an Observable id and data seperately
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
      .get() // return an Observable id and data seperately
      .pipe(map((result) => convertSnaps<Puzzle>(result)));
  }
}
