import { Component, OnInit, Input } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { SharedService } from '../shared/shared.service';
import { Exercise } from '../shared/exercise';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  exercises$: Observable<Exercise[]>;

  currentQuestion: number = 0;
  givenAnswers: any = [];
  startTime: Date = new Date();
  endTime: Date;
  duration: number;

  constructor(
    private _shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this.exercises$ = this._dataService.getAllExercises(5);
  }

  onClickAnswer(
    option: any,
    exercisesLength: number,
    { correctAnswer, id }: Exercise
  ): void {
    // TODO; performance API https://developer.mozilla.org/en-US/docs/Web/API/Performance
    this.endTime = new Date();
    this.duration = this.endTime.getTime() - this.startTime.getTime();
    const isCorrect = this._checkAnswer(option, correctAnswer);
    this.storeAnswer(isCorrect, id);
    this.currentQuestion++;
    this.startTime = new Date();

    if (this.currentQuestion >= exercisesLength) {
      this.showResult();
    }
  }

  private _checkAnswer(option: any, correctAnswer: string): boolean {
    if (option === correctAnswer) {
      // TODO: check if this is needed or can be fetched from correctAnswer
      this._shared.points++;
      this._shared.correctAnswer++;

      return true;
    }

    this._shared.incorrectAnswer++;

    return false;
  }

  storeAnswer(isCorrect: boolean, currentQuestionId: string): void {
    this._dataService.storeAnswer(currentQuestionId, isCorrect, this.duration);
  }

  compare(a: any, b: any): number {
    if (a.text === 'Keine Antwort ist richtig') {
      return 1;
    }
    if (parseInt(a.text) < parseInt(b.text)) {
      return -1;
    }
    if (parseInt(a.text) > parseInt(b.text)) {
      return 1;
    }
    if (a.text < b.text) {
      return -1;
    }
    if (a.text > b.text) {
      return 1;
    }
    return 0;
  }

  contains(options, value): number {
    if (options && value) {
      let i = options.length;
      while (i--) {
        if (options[i].text === value) {
          return i;
        }
      }
    }
    return -1;
  }

  // TODO: test
  sortAnswerOptions(options: any): void {
    if (!options) {
      return undefined;
    }

    options.sort(this.compare);

    return options;
  }

  showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }
}
