import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
      session: 'session2',
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
  }
}
