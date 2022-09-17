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
    console.log('storeUrlParameters');
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
    console.log('start storeSessionId');
    this.sessionId = sessionId;
    this._store.collection(`sessions`).add({
      sessionId: sessionId,
      url: window.location.href,
      startTime: serverTimestamp(),
    });

    this._store
      .collection('sessions', (ref) => ref.where('sessionId', '==', sessionId))
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          this.docId = snap.id;
          console.log('sessionId: ' + sessionId);
          console.log('snap.id: ' + snap.id);
          console.log('end (async) storeSessionId');
        });
        console.log('end (async2) storeSessionId');
      });
    console.log('end storeSessionId');
  }

  storeMode() {
    console.log('start storeMode');
    this._store.doc(`/sessions/${this.docId}`).update({
      mode: 'quiz',
    });
    console.log('docId: ' + this.docId);
  }

  storeSchoolClass(className: number) {
    /*
    this._store.doc(`/session2/${this.docId}`).update({
      schoolClass: className,
    });
    */
    this._store.collection(`quizzes`).add({
      schoolClass: className,
      sessionId: this.sessionId,
      url: window.location.href,
      startTime: serverTimestamp(),
    });
    this._store
      .collection('quizzes', (ref) =>
        ref.where('sessionId', '==', this.sessionId)
      )
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          this.quizId = snap.id;
          console.log('sessionId: ' + this.sessionId);
          console.log('snap.id: ' + snap.id);
        });
      });
    console.log('end storeSchoolClass');
  }

  storeResult(points) {
    /* 
    this._store.doc(`/session2/${this.docId}`).update({
      points: points,
      endTime: serverTimestamp(),
    });
    */
    this._store.doc(`/quizzes/${this.quizId}`).update({
      points: points,
      endTime: serverTimestamp(),
    });
  }
}
