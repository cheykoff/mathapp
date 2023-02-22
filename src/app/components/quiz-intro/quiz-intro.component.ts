import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedService } from '../../shared/shared.service';

import { Quiz2 } from 'src/app/shared/quiz2';

@Component({
  selector: 'app-quiz-intro',
  templateUrl: './quiz-intro.component.html',
  styleUrls: ['./quiz-intro.component.scss'],
})
export class QuizIntroComponent implements OnInit {
  quiz$: Observable<Quiz2>;

  header = 'DieMatheApp - Quiz';
  totalExercises = 10;
  quizTimeLimit = 1800;
  constructor(public shared: SharedService) {}

  ngOnInit(): void {}

  onStartQuiz() {
    const quizStartDate = new Date();
    this.shared.setQuizStartTime(quizStartDate);
  }
}
