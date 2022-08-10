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

/*
import { initializeApp } from '@angular/fire/app';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  getFirestore,
} from '@angular/fire/firestore';
*/

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private shared: SharedService) {}

  storeResult(points) {
    console.log('storeResult (data.service.ts)');
    const schoolClass = this.shared.getSchoolClass();

    this.http
      .post(
        'https://quizapp-d018b-default-rtdb.europe-west1.firebasedatabase.app/result.json',
        //{ points, schoolClass, createdAt: serverTimestamp() }
        { points, schoolClass, createdAt: Date.now() }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  /*
  firebaseConfig = {
    projectId: 'quizapp-d018b',
    appId: '1:628501369285:web:74eb20b73f6e1891fffbac',
    storageBucket: 'quizapp-d018b.appspot.com',
    locationId: 'europe-west3',
    apiKey: 'AIzaSyC9VBHxz2xe5x2V5LJB87VpQVrtwSWioEI',
    authDomain: 'quizapp-d018b.firebaseapp.com',
    messagingSenderId: '628501369285',
  };

  firebaseApp = initializeApp(this.firebaseConfig);
  db = getFirestore(this.firebaseApp);

  storeResult2() {
    console.log('storeResult');
  }
  */
}
