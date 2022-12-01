import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../../service/data.service';

import { Quiz } from 'src/app/shared/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  quizzes$: Observable<Quiz[]>;

  /*
  quizzes: Quiz[] = [
    {
      id: '1',
      date: new Date('November 7, 2022 12:25:00'),
      name: 'Quiz 1',
      attempts: 0,
    },
    {
      id: '2',
      date: new Date('November 18, 2022 12:25:00'),
      name: 'Quiz 2',
      attempts: 2,
    },
    {
      id: '3',
      date: new Date('November 25, 2022 12:25:00'),
      name: 'Quiz 3',
      disabled: true,
    },
  ];
  */
  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    console.log('QuizComponent.ngOnInit()');
    this.quizzes$ = this._dataService.getQuizzes4();
    // this._dataService.storeAccessTime();
  }
}
