import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private shared: SharedService,
    private _store: AngularFirestore
  ) {}

  urlParameters = {};

  storeUrlParameters(parameters) {
    this._store.collection('session').add({
      session: 'session3',
      startTime: Date.now(),
      url: window.location.href,
    });
  }

  docId = '';
  quizId = '';
  sessionId = '';

  storeSessionId(sessionId) {
    this.sessionId = sessionId;
    this._store.collection(`sessions`).add({
      sessionId: sessionId,
      url: window.location.href,
      startTime: serverTimestamp(),
    });

    this._store // TODO: Get exactly the right document
      .collection('sessions', (ref) => ref.where('sessionId', '==', sessionId))
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          // TODO: Is it possible without the loop?
          this.docId = snap.id;
        });
      });
  }

  storeMode() {
    this._store.doc(`/sessions/${this.docId}`).update({
      mode: 'quiz',
    });
  }

  storeSchoolClass(className: number) {
    this._store.collection(`quizzes`).add({
      schoolClass: className,
      sessionId: this.sessionId,
      url: window.location.href,
      startTime: serverTimestamp(),
    });
    this._store // TODO: Get exactly the right document
      .collection('quizzes', (ref) =>
        ref.where('sessionId', '==', this.sessionId)
      )
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          // TODO: Is it possible without the loop?
          this.quizId = snap.id;
        });
      });
  }

  storeResult(points) {
    this._store.doc(`/quizzes/${this.quizId}`).update({
      points: points,
      endTime: serverTimestamp(),
    });
  }
}
