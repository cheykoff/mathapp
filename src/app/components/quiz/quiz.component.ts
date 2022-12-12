import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../../service/data.service';

import { Quiz } from 'src/app/shared/quiz';
import { QuizTemplate } from 'src/app/shared/quiz-template';
import { SchoolClass2 } from 'src/app/shared/schoolClass';
import { Student } from 'src/app/shared/student';
import { SharedService } from 'src/app/shared/shared.service';

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

  constructor(
    private _dataService: DataService,
    public shared: SharedService
  ) {}

  ngOnInit(): void {
    /*
    this.quizTemplates$ = this._dataService.getQuizTemplates();
    this.schoolClass$ = this._dataService.getQuizTemplates2();
    this._dataService.getQuizTemplateIDs();
    */
  }
}
