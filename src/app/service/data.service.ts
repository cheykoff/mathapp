import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { map } from 'rxjs/operators';
import {
  provideFirestore,
  getFirestore,
  serverTimestamp,
  FieldValue,
} from '@angular/fire/firestore';
import {
  Database,
  set,
  ref,
  update,
  onValue,
  remove,
} from '@angular/fire/database';
import { getDatabase } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private shared: SharedService) {}

  urlParameters = {};

  storeUrlParameters(parameters) {
    console.log('storeUrlParameters', parameters);
    this.urlParameters = parameters;
    this.http.post(
      'https://quizapp-d018b-default-rtdb.europe-west1.firebasedatabase.app/test.json',
      //'https://quizapp-d018b-default-rtdb.europe-west1.firebasedatabase.app/parameters.json',
      {
        parameters,
        startTime: Date.now(),
        url: window.location.href,
      }
    );
  }

  storeResult(points) {
    const schoolClass = this.shared.getSchoolClass();
    const parameters = this.urlParameters;

    this.http.post(
      'https://quizapp-d018b-default-rtdb.europe-west1.firebasedatabase.app/result.json',
      {
        points,
        schoolClass,
        createdAt: Date.now(),
        url: window.location.href,
        parameters,
      }
    );
  }
}
