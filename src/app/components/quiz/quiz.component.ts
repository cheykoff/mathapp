import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../../service/data.service';

import { Quiz } from 'src/app/shared/quiz';
import { QuizTemplate } from 'src/app/shared/quiz-template';
import { SchoolClass2 } from 'src/app/shared/schoolClass';
import { Student } from 'src/app/shared/student';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  quizzes$: Observable<Quiz[]>;

  quizTemplates$: Observable<QuizTemplate[]>;
  quizTemplates2$: Observable<QuizTemplate[]>;
  schoolClass$: Observable<SchoolClass2>;
  student$: Observable<Student>;
  schoolClass2$: Observable<SchoolClass2>;

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
    // this.quizzes$ = this._dataService.getQuizzes4();
    this.quizTemplates$ = this._dataService.getQuizTemplates();
    // this._dataService.storeAccessTime();
    this.schoolClass$ = this._dataService.getQuizTemplates2();
    // this.student$ = this._dataService.getSchoolClassId();
    // this._dataService.getQuizTemplates3();
    // this.schoolClass2$ = this._dataService.getSchoolClassByStudentId();
    this._dataService.getQuizTemplateIDs();
  }
}
