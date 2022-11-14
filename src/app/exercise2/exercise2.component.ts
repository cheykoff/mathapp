import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, map, Observable, Subscription, timer } from 'rxjs';
import { NgForm } from '@angular/forms';

import { SharedService } from '../shared/shared.service';
import { Exercise2 } from '../shared/exercise2';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.scss'],
})
export class Exercise2Component implements OnInit {
  exercises$: Observable<Exercise2[]>;
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
  penaltyCountDown: Subscription;
  penalty: number = 5;
  penaltyCount: number = 0;
  answerPossible: boolean = true;
  tick = 1000;
  streakCount: number = 0;

  constructor(
    public shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    // this.exercises$ = this._dataService.getAllExercises(5);
    // this.exercises$ = this._dataService.getAllExercisesByTestNumber(2); // For test at 14.10.2022
    // this.exercises$ = this._dataService.getAllExercisesByClassLevel(); // For test at 18.10.2022
    // this.exercises$ = this._dataService.getAllExercisesPitch(); // For pitch at EdTech Next 25.10.2022
    // this.exercises$ = this._dataService.getAllExercisesByClassLevel().pipe(map((exercises: Exercise[]) => this.shuffleExercises(exercises))); // For test at 28.10.2022
    this.exercises$ = this._dataService.getAllExercises2();
  }

  shuffleExercises(exercises: Exercise2[]): Exercise2[] {
    for (let i = exercises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [exercises[i], exercises[j]] = [exercises[j], exercises[i]];
    }
    return exercises;
  }

  penaltyTimer(): void {
    this.penaltyCountDown = timer(0, this.tick).subscribe(() => {
      --this.penalty;
      if (this.penalty === 0) {
        this.answerPossible = true;
        this.isDisabled = false;
        this.penaltyCountDown.unsubscribe();
      }
    });
    this.penalty = Math.min(5 * (1 + this.penaltyCount), 30);
    this.penaltyCount++;
  }

  getCorrectAnswer(exercise: Exercise2): void {
    exercise.answerOptions.forEach((answerOption) => {
      if (answerOption.isCorrect) {
        this.correctAnswer = answerOption.answerText;
      }
    });
  }

  onSubmitAnswer(form: NgForm, exercise: Exercise2) {
    console.log('onSubmitAnswer');
    console.log(exercise);
    if (exercise.answerType === 'fraction') {
      const correctDenominator = exercise.denominator;
      const correctNumerator = exercise.numerator;
      const givenDenominator = form.value.denominator;
      const givenNumerator = form.value.numerator;

      if (
        parseInt(givenDenominator) === parseInt(correctDenominator) &&
        parseInt(givenNumerator) === parseInt(correctNumerator)
      ) {
        this.shared.correctAnswer++;
        this.streakCount++;
        this.answerIsCorrect = true;

        setTimeout(() => {
          this.currentQuestion++;
          this.answerIsCorrect = false;
          this.isDisabled = false;
          this.attempts = 0;
          if (this.currentQuestion >= 3) {
            this.showResult();
          }
        }, 1000);
        return true;
      }
      this.answerIsIncorrect = true;
      this.answerIsCorrect = false;
      this.answerPossible = false;
      this.penaltyTimer();
      return false;
    }

    const givenAnswer = form.value.givenAnswer;
    console.log(givenAnswer);

    if (
      parseInt(givenAnswer.toString().trim()) ===
      parseInt(exercise.correctAnswer)
    ) {
      this.currentQuestion++;
      this.streakCount++;
      this.answerIsCorrect = true;
      if (this.currentQuestion >= 3) {
        this.showResult();
      }
      return true;
    }
    this.answerIsIncorrect = true;
    this.answerIsCorrect = false;
    this.answerPossible = false;
    this.penaltyTimer();
    return false;
  }

  onClickAnswer(
    option: any,
    exercisesLength: number,
    exercise: Exercise2
  ): void {
    // TODO; performance API https://developer.mozilla.org/en-US/docs/Web/API/Performance
    this.attempts++;
    this.endTime = new Date();
    this.duration = this.endTime.getTime() - this.startTime.getTime();
    this.getCorrectAnswer(exercise);
    const exerciseSolved = this._checkAnswer(option.isCorrect);
    this.storeAnswer(exerciseSolved, exercise.id);

    this.startTime = new Date();

    if (this.currentQuestion >= exercisesLength - 1 && exerciseSolved) {
      this.showResult();
    }
  }

  private _checkAnswer(isCorrect: boolean): boolean {
    this.isDisabled = true;
    if (isCorrect) {
      if (this.attempts === 1) {
        // TODO: check if this is needed or can be fetched from correctAnswer
        this.shared.correctAnswer++;
        this.streakCount++;
        if (this.streakCount >= 3) {
          this.penaltyCount = 0;
        }
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
      this.shared.incorrectAnswer++;
      this.streakCount = 0;
    }
    this.answerIsIncorrect = true;
    this.answerIsCorrect = false;
    this.answerPossible = false;
    this.penaltyTimer();

    return false;
  }

  storeAnswer(isCorrect: boolean, currentQuestionId: string): void {
    this._dataService.storeAnswer(
      currentQuestionId,
      isCorrect,
      this.duration,
      this.attempts
    );
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
