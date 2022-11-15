import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, map, Observable, Subscription, timer } from 'rxjs';
import { NgForm } from '@angular/forms';

import { SharedService } from '../shared/shared.service';
import { Exercise } from '../shared/exercise';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  currentQuestion: number = 0;
  totalQuestions: number = 20;
  givenAnswer = '';
  numerator: string = '';
  denominator: string = '';
  givenAnswers: any = [];
  startTime: Date = new Date();
  endTime: Date;
  duration: number;
  answerIsCorrect: boolean = false;
  answerIsIncorrect: boolean = false;
  correctAnswer: string = '';
  isDisabled: boolean;
  attempts: number = 0;
  maxAttempts: number = 3;
  // penaltyCountDown: Subscription;
  // penalty: number = 5;
  // penaltyCount: number = 0;
  answerPossible: boolean = true;
  tick = 1000;
  streakCount: number = 0;

  constructor(
    public shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this.exercises$ = this._dataService.getAllExercises(); // For homework at 16.11.2022
    // .pipe(map((exercises: Exercise2[]) => this.shuffleExercises(exercises))); // pipe to shuffle exercises
  }

  shuffleExercises(exercises: Exercise[]): Exercise[] {
    for (let i = exercises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [exercises[i], exercises[j]] = [exercises[j], exercises[i]];
    }
    return exercises;
  }
  /*
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
  */

  getCorrectAnswer(exercise: Exercise): void {
    exercise.answerOptions.forEach((answerOption) => {
      if (answerOption.isCorrect) {
        this.correctAnswer = answerOption.answerText;
      }
    });
  }

  onSubmitAnswer(form: NgForm, exercise: Exercise) {
    this.endTime = new Date();
    this.duration = this.endTime.getTime() - this.startTime.getTime();
    if (exercise.answerType === 'fraction') {
      const correctDenominator = exercise.correctAnswerFraction.denominator;
      const correctNumerator = exercise.correctAnswerFraction.numerator;
      const givenDenominator = form.value.denominator;
      const givenNumerator = form.value.numerator;

      if (
        parseInt(givenDenominator) === parseInt(correctDenominator) &&
        parseInt(givenNumerator) === parseInt(correctNumerator)
      ) {
        this.isDisabled = true;
        if (this.attempts === 0) {
          this.shared.correctAnswer++;
          this.streakCount++;
          this.storeAnswer(true, exercise.id);
        } else {
          this.storeAnswer(false, exercise.id);
        }
        this.answerIsCorrect = true;
        this.answerIsIncorrect = false;

        setTimeout(() => {
          this.currentQuestion++;
          this.startTime = new Date();
          this.denominator = '';
          this.numerator = '';
          this.answerIsCorrect = false;
          this.isDisabled = false;
          this.attempts = 0;
          if (this.currentQuestion >= this.totalQuestions) {
            this.showResult();
          }
        }, 1000);
        return true;
      }
      if (this.attempts === 0) {
        this.shared.incorrectAnswer++;
      }
      this.attempts++;
      if (this.attempts >= this.maxAttempts) {
        this.isDisabled = true;
        this.storeAnswer(false, exercise.id);
      }
      this.answerIsIncorrect = true;
      this.answerIsCorrect = false;
      this.answerPossible = false;
      this.streakCount = 0;
      // this.penaltyTimer();
      return false;
    }

    const givenAnswer = form.value.givenAnswer;
    if (exercise.answerType === 'integer') {
      if (
        givenAnswer.toString().replace('.', ',').trim() ===
        exercise.correctAnswer
      ) {
        if (this.attempts === 0) {
          this.streakCount++;
          this.shared.correctAnswer++;
          this.storeAnswer(true, exercise.id);
        } else {
          this.storeAnswer(false, exercise.id);
        }

        this.answerIsCorrect = true;
        this.answerIsIncorrect = false;
        this.isDisabled = true;

        setTimeout(() => {
          this.currentQuestion++;
          this.startTime = new Date();
          this.answerIsCorrect = false;
          this.isDisabled = false;
          this.givenAnswer = '';
          this.attempts = 0;
          if (this.currentQuestion >= this.totalQuestions) {
            this.showResult();
          }
        }, 1000);

        if (this.currentQuestion >= this.totalQuestions) {
          this.showResult();
        }
        return true;
      }
      if (this.attempts === 0) {
        this.shared.incorrectAnswer++;
      }
      this.attempts++;
      if (this.attempts >= this.maxAttempts) {
        this.isDisabled = true;
        this.storeAnswer(false, exercise.id);
      }
      this.answerIsIncorrect = true;
      this.answerIsCorrect = false;
      this.answerPossible = false;
      this.streakCount = 0;
      // this.penaltyTimer();
      return false;
    }
    return false;
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
          // this.penaltyCount = 0;
        }
      }
      this.answerIsCorrect = true;
      this.answerIsIncorrect = false;
      setTimeout(() => {
        this.currentQuestion++;
        this.startTime = new Date();
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
    setTimeout(() => {
      this.answerPossible = true;
      this.isDisabled = false;
    }, 1000);
    // this.penaltyTimer();

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

  nextExercise(): void {
    if (this.currentQuestion >= this.totalQuestions - 1) {
      this.showResult();
    }
    this.currentQuestion++;
    this.answerIsCorrect = false;
    this.answerIsIncorrect = false;
    this.isDisabled = false;
    this.attempts = 0;
    this.answerPossible = true;
    this.givenAnswer = '';
    this.numerator = '';
    this.denominator = '';
  }

  showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }
}
