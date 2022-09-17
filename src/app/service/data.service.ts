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

  storeSessionId() {
    console.log('storeSessionId: ' + this.shared.getSessionId());

    this._store.collection(`sessions`).add({
      sessionId: this.shared.getSessionId(),
      url: window.location.href,
      startTime: serverTimestamp(),
      parameters: this.shared.getParameters(),
    });

    this._store // TODO: Get exactly the right document
      .collection('sessions', (ref) =>
        ref.where('sessionId', '==', this.shared.getSessionId())
      )
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          // TODO: Is it possible without the loop?
          this.shared.setDocId(snap.id);
        });
      });
  }

  storeMode() {
    this._store.doc(`/sessions/${this.shared.getDocId()}`).update({
      mode: 'quiz',
    });
  }

  storeSchoolClass(className: number) {
    this._store.collection(`quizzes`).add({
      schoolClass: className,
      sessionId: this.shared.getSessionId(),
      url: window.location.href,
      startTime: serverTimestamp(),
    });
    this._store // TODO: Get exactly the right document
      .collection('quizzes', (ref) =>
        ref.where('sessionId', '==', this.shared.getSessionId())
      )
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          // TODO: Is it possible without the loop?
          this.shared.setQuizId(snap.id);
        });
      });
  }

  storeResult(points) {
    this._store.doc(`/quizzes/${this.shared.getQuizId()}`).update({
      points: points,
      endTime: serverTimestamp(),
    });
  }
}
