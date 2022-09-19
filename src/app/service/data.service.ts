import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // TODO: Not used
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private _shared: SharedService,
    private _store: AngularFirestore
  ) {}

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
}
