import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';

import { SharedService } from '../shared/shared.service';
import { Exercise } from '../shared/exercise';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit, OnDestroy {
  exercises$: Observable<Exercise[]>;
  // TODO: Should I store the currentQuestion in sharedService? How do I access it in the template?
  currentQuestion: number = 0;
  givenAnswers: any = [];
  startTime: Date = new Date();
  endTime: Date;
  duration: number;
  answerIsCorrect: boolean = false;
  answerIsIncorrect: boolean = false;
  correctAnswer: string = '';
  isDisabled: boolean;
  attempts: number = 0;

  countDown: Subscription;
  counter = 1800;
  tick = 1000;

  constructor(
    private _shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this._dataService.storeQuizId();
    this.exercises$ = this._dataService.getAllExercises(5);
    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      if (this.counter === 0) {
        this.showResult();
      }
    });
  }

  ngOnDestroy(): void {
    this.countDown.unsubscribe();
    this.countDown = null;
  }

  getCorrectAnswer(exercise: any): string {
    exercise.answerOptions.forEach((answerOption) => {
      if (answerOption.isCorrect) {
        this.correctAnswer = answerOption.answerText;
      }
    });
    return this.correctAnswer;
  }

  onClickAnswer(
    option: any,
    exercisesLength: number,
    exercise: Exercise
  ): void {
    // TODO; performance API https://developer.mozilla.org/en-US/docs/Web/API/Performance
    this.attempts++;
    this.endTime = new Date();
    this.duration = this.endTime.getTime() - this.startTime.getTime();
    this.getCorrectAnswer(exercise);
    // const isCorrect = this._checkAnswer(option.isCorrect);
    this.storeAnswer(this._checkAnswer(option.isCorrect), exercise.id);

    this.startTime = new Date();

    if (this.currentQuestion >= exercisesLength - 1) {
      this.showResult();
    }
  }

  private _checkAnswer(isCorrect: boolean): boolean {
    if (isCorrect) {
      this.isDisabled = true;
      if (this.attempts === 1) {
        // TODO: check if this is needed or can be fetched from correctAnswer
        this._shared.correctAnswer++;
      }
      this.answerIsCorrect = true;
      this.answerIsIncorrect = false;
      setTimeout(() => {
        this.currentQuestion++;
        this.answerIsCorrect = false;
        this.isDisabled = false;
        this.attempts = 0;
      }, 1000);
      return true;
    }
    if (this.attempts === 1) {
      this._shared.incorrectAnswer++;
    }
    this.answerIsIncorrect = true;
    this.answerIsCorrect = false;

    return false;
  }

  storeAnswer(isCorrect: boolean, currentQuestionId: string): void {
    this._dataService.storeAnswer(currentQuestionId, isCorrect, this.duration);
  }

  public compare2(a: any, b: any): any {
    return a - b;
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
  public sortAnswerOptions(options: any): any {
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
