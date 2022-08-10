import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
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
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css'],
})
export class ResultpageComponent implements OnInit {
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  points: number = 0;
  percentage: number = 0;
  constructor(
    private shared: SharedService,
    private dataService: DataService
  ) {}

  getPercentage(): number {
    return (
      (this.correctAnswer / (this.correctAnswer + this.incorrectAnswer)) * 100
    );
  }

  getStars(): string {
    const stars = Math.floor(this.getPercentage() / 20);
    let imgUrl = 'assets/img/' + stars + 'stars.gif';
    if (!stars) {
      imgUrl = 'assets/img/' + 0 + 'stars.gif';
    }
    return imgUrl;
  }

  ngOnInit(): void {
    this.points = this.shared.getPoints();
    this.correctAnswer = this.shared.getCorrectAnswer();
    this.incorrectAnswer = this.shared.getIncorrectAnswer();
    this.storeResult();
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
  */
  storeResult() {
    console.log('storeResult (resultpage)');

    this.dataService.storeResult(this.points);
    /*
    // DataService.storeResult2();

    try {
      console.log('try to write into db');
      /*addDoc(collection(this.db, 'results'), {
        name: 'test',
        points: this.points,
      });
    } catch (e) {
      console.log('error adding document: ', e);
    }
    */
  }
}
