import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../../service/data.service';

import { Exercise } from 'src/app/shared/exercise';
import { Quiz2 } from 'src/app/shared/quiz2';

@Component({
  selector: 'app-quiz-intro',
  templateUrl: './quiz-intro.component.html',
  styleUrls: ['./quiz-intro.component.css'],
})
export class QuizIntroComponent implements OnInit {
  quiz$: Observable<Quiz2>;

  header = 'DieMatheApp - Quiz';
  totalExercises = 10;
  quizTimeLimit = 1800;
  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this.quiz$ = this._dataService.getExercisesByQuizId2();
  }
}
