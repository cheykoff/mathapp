import { Component } from '@angular/core';
// import { AngularFireStore } from '@angular/fire/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  title = 'quizappv1';
  /*
  exercise$: Observable<Exercise[]>;

  constructor(firestore: Firestore) {
    const exercises = collection(firestore, 'exercises');
    this.exercise$ = <Observable<Exercise[]>>collectionData(exercises);
  }
  */
  
}
