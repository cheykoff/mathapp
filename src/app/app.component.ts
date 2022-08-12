import { Component } from '@angular/core';
// import { AngularFireStore } from '@angular/fire/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from './service/data.service';

interface Exercise {
  question: string;
  answers: number[];
  correctAnswer: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /*template: `
    <div *ngFor="let exercise of exercise$ | async">
      <p>Question: {{ exercise.question }}</p>
      <ul>
        <li *ngFor="let answer of exercise.answers">{{ answer }}</li>
      </ul>
      <p>Correct answer: {{ exercise.correctAnswer }}</p>
    </div>
  `,
  */
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private dataService: DataService) {}

  title = 'quizappv1';
  parameters = {};
  ngOnInit(): void {
    console.log('app.component - ngOnInit');
    console.log(window.location.href);
    this.getParameters();
  }

  getParameters() {
    let urlString = window.location.href;
    console.log('urlString: ' + urlString);
    let paramString = urlString.split('?')[1];
    console.log('paramString: ' + paramString);
    if (paramString) {
      this.parameters = paramString.split('&');
      console.log('params: ' + this.parameters);
      console.log(typeof this.parameters);
    }
    this.dataService.storeUrlParameters(this.parameters);
  }

  /*
  exercise$: Observable<Exercise[]>;

  constructor(firestore: Firestore) {
    const exercises = collection(firestore, 'exercises');
    this.exercise$ = <Observable<Exercise[]>>collectionData(exercises);
  }
  */
}
