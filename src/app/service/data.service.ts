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
    if (parameters.length === 1) {
      const userId = parameters[0].split('=')[1];
      this.http
        .post(
          'https://quizapp-d018b-default-rtdb.europe-west1.firebasedatabase.app/parameters.json',
          {
            userId: userId,
            startTime: Date.now(),
            url: window.location.href,
          }
        )
        .subscribe((response) => {});
    } else {
      this.urlParameters = parameters;
      this.http
        .post(
          'https://quizapp-d018b-default-rtdb.europe-west1.firebasedatabase.app/parameters.json',
          {
            parameters,
            startTime: Date.now(),
            url: window.location.href,
          }
        )
        .subscribe((response) => {});
    }
  }

  docId = '';
  sessionId = '';

  storeSessionId(sessionId) {
    this.sessionId = sessionId;
    this._store.collection(`session2`).add({
      sessionId: sessionId,
      url: window.location.href,
      startTime: serverTimestamp(),
    });
    this._store
      .collection('session2', (ref) => ref.where('sessionId', '==', sessionId))
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          this.docId = snap.id;
          console.log('sessionId: ' + sessionId);
          console.log('snap.id' + snap.id);
        });
      });
  }

  storeMode() {
    this._store.doc(`/session2/${this.docId}`).update({
      mode: 'quiz',
    });
    console.log('docId: ' + this.docId);
  }

  storeSchoolClass(className: number) {
    this._store.doc(`/session2/${this.docId}`).update({
      schoolClass: className,
    });
    this._store.collection(`quizzes`).add({
      schoolClass: className,
      sessionId: this.sessionId,
      url: window.location.href,
      startTime: serverTimestamp(),
    });
  }

  storeResult(points) {
    const schoolClass = this.shared.getSchoolClass();
    const parameters = this.urlParameters;

    this.http
      .post(
        'https://quizapp-d018b-default-rtdb.europe-west1.firebasedatabase.app/result.json',
        {
          points,
          schoolClass,
          endTime: Date.now(),
          url: window.location.href,
          parameters,
        }
      )
      .subscribe((response) => {});

    this._store.doc(`/session2/${this.docId}`).update({
      points: points,
      endTime: serverTimestamp(),
    });
  }
}
