import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // TODO: Not used
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { CollectionReference, serverTimestamp } from 'firebase/firestore';
import { Observable, map } from 'rxjs';

import { Exercise } from '../shared/exercise';
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
      parameters: this._shared.getParameters(),
    });

    this._store // TODO: Get exactly the right document
      .collection('sessions', (ref) =>
        ref.where('sessionId', '==', this._shared.getSessionId())
      )
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          // TODO: Is it possible without the loop?
          this._shared.setDocId(snap.id);
        });
      });
  }

  storeMode() {
    this._store.doc(`/sessions/${this._shared.getDocId()}`).update({
      mode: 'quiz',
    });
  }

  storeSchoolClass(className: number) {
    this._store.collection(`quizzes`).add({
      schoolClass: className,
      sessionId: this._shared.getSessionId(),
      url: window.location.href,
      startTime: serverTimestamp(),
    });
    this._store // TODO: Get exactly the right document
      .collection('quizzes', (ref) =>
        ref.where('sessionId', '==', this._shared.getSessionId())
      )
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          // TODO: Is it possible without the loop?
          this._shared.setQuizId(snap.id);
        });
      });
  }

  storeResult() {
    this._store.doc(`/quizzes/${this._shared.getQuizId()}`).update({
      correctAnswers: this._shared.correctAnswer,
      totalQuestions: this._shared.correctAnswer + this._shared.incorrectAnswer,
      endTime: serverTimestamp(),
    });
  }

  getExercise(
    classLevel: number,
    questionNumber: number
  ): Observable<Exercise[]> {
    console.log(
      'getExercise() in data.service.ts, classLevel: ' +
        classLevel +
        ' questionNumber: ' +
        questionNumber
    );
    return this._store
      .collection('exercises', (ref) =>
        ref
          .where('classLevel', '==', classLevel)
          // .where('orderNumber', '==', questionNumber)
          .orderBy('orderNumber')
      )
      .get() // return an Observable id and data seperately
      .pipe(map((result) => convertSnaps<Exercise>(result))); // return an observable
  }

  getAllExercises2(classLevel: number): Observable<Exercise[]> {
    console.log('getExercise() in data.service.ts, classLevel: ' + classLevel);

    return this._store
      .collection('exercises', (ref) =>
        ref
          .where('classLevel', '==', classLevel)
          // .where('orderNumber', '==', questionNumber)
          .orderBy('orderNumber')
      )
      .get() // return an Observable id and data seperately
      .pipe(map((result) => convertSnaps<Exercise>(result))); // return an observable id and data in one object
  }

  getAllExercises3(classLevel: number) {
    console.log('getExercise() in data.service.ts, classLevel: ' + classLevel);

    return this._store
      .collection('exercises', (ref) =>
        ref
          .where('classLevel', '==', classLevel)
          // .where('orderNumber', '==', questionNumber)
          .orderBy('orderNumber')
      )
      .get() // return an Observable id and data seperately
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          console.log('snap: ' + snap.id);
          console.log('snap: ' + snap.data());
          // console.log('snap: ' + ...<any>snap.data());
        });
      });
  }

  getAllExercises(classLevel: number): Observable<Exercise[]> {
    console.log('getExercise() in data.service.ts, classLevel: ' + classLevel);
    return this._store
      .collection('exercises', (ref) =>
        ref
          .where('classLevel', '==', classLevel)
          // .where('orderNumber', '==', questionNumber)
          .orderBy('orderNumber')
      )
      .get() // return an Observable id and data seperately
      .pipe(
        map((results) => {
          return results.docs.map((snap) => {
            return {
              id: snap.id,
              ...(<any>snap.data()),
            };
          });
        })
      );
    /*
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          console.log('snap: ' + snap.id);
          console.log(snap.data());
          // console.log(snap.data.question);
        });
      });
      /*

    /* 
      .pipe(map(results) => {
        results.docs.map(snap => {
          console.log(snap.id);
          console.log(snap.data());
        })
        

      });
      */
  }
}
