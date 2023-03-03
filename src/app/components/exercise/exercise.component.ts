import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { NgForm } from '@angular/forms';

import { SharedService } from '../../services/shared.service';
import { Exercise } from './exercise';
import { ExerciseRecord } from './exerciserecord';
import { GetExercisesService } from '../../services/get-exercises.service';
import { CheckanswerService } from './services/checkanswer.service';
import { CheckDynamicAnswerService } from './services/checkdynamicanswer.service';
import { SaveanswerService } from './services/saveanswer.service';
import { StoreQuizService } from 'src/app/services/store-quiz.service';
import { StorePracticeService } from 'src/app/services/store-practice.service';

import { createExercise } from './create-exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  // public variables
  exercises$: Observable<Exercise[]>;

  /*
  Observable in parent
  inject the parent in the child

  */

  maxAttempts: number = 3;

  srcs: string[] = [];

  exercises: Exercise[] = [];

  currentQuestion: number = 0;
  attempts: number = 0;
  streakCount: number = 0;

  question: string = '';
  answer: number;
  givenAnswer: number = undefined;
  numerator: string = '';
  denominator: string = '';
  givenAnswers: any = [];

  startTime: Date = new Date();
  endTime: Date;
  duration: number;

  isCorrect: boolean;

  answerPossible: boolean = true;
  // answerIsCorrect: boolean = null;
  // answerIsIncorrect: boolean = null;
  feedbackIsShown: boolean = false;

  correctAnswer: string = '';
  isDisabled: boolean;

  showNextButton: boolean = false;

  private _currentLevelStars: number;

  // private variables

  // constructor
  constructor(
    public shared: SharedService,
    private _router: Router,
    private _checkAnswerService: CheckanswerService,
    private _checkDynamicAnswerService: CheckDynamicAnswerService,
    private _saveAnswerService: SaveanswerService,
    private _getExercisesService: GetExercisesService,
    private _storeQuizService: StoreQuizService,
    private _storePracticeService: StorePracticeService
  ) {}

  // ngOnInit
  ngOnInit(): void {
    this.resetCounts();
    if (this.shared.mode === 'practice') {
      this.shared.totalSessionQuestions = 10;
      let { question, answer, startTime } = createExercise(
        this.shared.chosenLevel,
        this.shared.topic
      );
      this.question = question;
      this.answer = answer;
      this.startTime = startTime;
      this._storePracticeService.storePracticeStart();
    } else {
      const quizStartDate = new Date();
      this.shared.setQuizStartTime(quizStartDate);
      this._storeQuizService.storeQuizStart();
      this.shared.countDownTimer();
      this.exercises$ = this._getExercisesService
        .getExercises()
        .pipe(map((exercises: Exercise[]) => this.shuffleExercises(exercises)))
        .pipe(
          tap((data: Exercise[]) => {
            this.shared.totalSessionQuestions = Math.min(
              this.shared.totalSessionQuestions,
              data.length
            );
            for (let exercise of data) {
              this.exercises.push(exercise);
              this.srcs.push('assets/img/geometry/' + exercise.img + '.jpg');
            }
          })
        );
    }
  }

  // public methods
  getSrc(): string {
    if (this.srcs.length === 0) {
      return null;
    }
    return this.srcs[this.currentQuestion];
  }

  getImg(): string {
    if (!this.exercises[this.currentQuestion].img) {
      return null;
    }
    return this.exercises[this.currentQuestion].img;
  }

  resetCounts(): void {
    this.shared.correctAnswer = 0;
    this.shared.incorrectAnswer = 0;
    this.streakCount = 0;
    this.attempts = 0;
  }

  shuffleExercises(exercises: Exercise[]): Exercise[] {
    for (let i = exercises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [exercises[i], exercises[j]] = [exercises[j], exercises[i]];
    }
    return exercises;
  }

  onSubmitAnswer(form: NgForm, exercise?: Exercise) {
    if (form.valid) {
      this.trackDurationAndAttempts();

      if (this.shared.mode === 'practice') {
        this.saveDynamicAnswer(
          this._checkDynamicAnswerService.checkDynamicAnswer(form, this.answer)
        );
      } else if (exercise.answerType === 'integer') {
        if (form.value.givenAnswer != '' && form.value.givenAnswer != null) {
          // I think it is not needed anymore (the check is in checkAnswer already)
          const tmp = this._checkAnswerService.checkIntegerAnswer({
            form,
            exercise,
          });
          this.isCorrect = tmp;
          this.saveAnswer(tmp, exercise);
        }
      } else {
        const givenAnswerFraction = {
          numerator: parseInt(form.value.numerator),
          denominator: parseInt(form.value.denominator),
        };
        const correctAnswerFraction = {
          numerator: parseInt(exercise.correctAnswerFraction.numerator),
          denominator: parseInt(exercise.correctAnswerFraction.denominator),
        };
        this.saveAnswer(
          this._checkAnswerService.checkFractionAnswer(
            givenAnswerFraction,
            correctAnswerFraction
          ),
          exercise
        );
      }
      this.showFeedback();
      // this.saveAnswer(this.isCorrect, exercise);
    }
    form.reset();
  }

  onClickAnswer(option: any, exercise: Exercise): void {
    this.trackDurationAndAttempts();
    this.saveAnswer(!!option.isCorrect, exercise);
    this.showFeedback();
  }

  trackDurationAndAttempts(): void {
    // TODO; performance API https://developer.mozilla.org/en-US/docs/Web/API/Performance
    this.endTime = new Date();
    this.duration = this.endTime.getTime() - this.startTime.getTime();
    this.attempts++;
  }

  incrementCorrectAnswers(): void {
    this.streakCount++;
  }

  saveAnswer(isCorrect: boolean, exercise: Exercise): void {
    const exerciseRecord: ExerciseRecord = {
      exercise,
      duration: this.duration,
      attempts: this.attempts,
      answerIsCorrect: isCorrect,
    };

    this._saveAnswerService.saveAnswer(exerciseRecord);
    if (isCorrect) {
      if (this.attempts === 1) {
        this.streakCount++;
        this.shared.incrementCorrectAnswer();
      }
      this.isDisabled = true;
      this.isCorrect = true;
      // this.showFeedback(true);
      this.showNextButton = true;
    } else {
      if (this.attempts === 1) {
        this.shared.incorrectAnswer++;
        this.streakCount = 0;
      }
      // this.showFeedback(false);
      if (this.attempts >= this.maxAttempts && exercise.answerType !== 'mc') {
        this.showNextButton = true;
        this.isDisabled = true;
      }
    }
    this.storeAnswer(isCorrect, exercise.id);
    return;
  }

  storeAnswer(isCorrect: boolean, currentQuestionId: string): void {
    this._storeQuizService.storeAnswer(
      currentQuestionId,
      isCorrect,
      this.duration,
      this.attempts,
      this.startTime,
      this.endTime
    );
  }

  saveDynamicAnswer(isCorrect: boolean): void {
    if (isCorrect) {
      this.isCorrect = true;
      if (this.attempts === 1) {
        this.streakCount++;
        this.shared.correctAnswer++;
      }
      this.isDisabled = true;
      // this.showFeedback(true);
      this.showNextButton = true;
    } else {
      this.isCorrect = false;
      if (this.attempts === 1) {
        this.shared.incorrectAnswer++;
      }
      this.streakCount = 0;
      // this.showFeedback(false);
      if (this.attempts >= this.maxAttempts) {
        this.showNextButton = true;
        this.isDisabled = true;
      }
    }
    this.storeDynamicAnswer(isCorrect);
    return;
  }

  storeDynamicAnswer(isCorrect: boolean): void {
    this._storePracticeService.storeDynamicAnswer(
      this.question,
      this.answer,
      this.givenAnswer,
      isCorrect,
      this.duration,
      this.shared.chosenLevel,
      this.attempts
    );
  }

  showFeedback(): void {
    this.feedbackIsShown = true;
  }

  hideFeedback(): void {
    this.feedbackIsShown = false;
  }

  feedbackIsShown2(): boolean {
    return this.feedbackIsShown;
  }

  nextExercise(): void {
    if (this.currentQuestion >= this.shared.totalSessionQuestions - 1) {
      this.showResult();
    }
    this.clearForm();
    if (this.shared.mode === 'practice') {
      let { question, answer, startTime } = createExercise(
        this.shared.chosenLevel,
        this.shared.topic
      );
      this.question = question;
      this.answer = answer;
      this.startTime = startTime;
    }
    this.currentQuestion++;
    this.startTime = new Date();

    if (
      this.shared.correctAnswer + this.shared.incorrectAnswer >=
      this.shared.totalSessionQuestions
    ) {
      if (this.shared.mode === 'practice') {
        this.calculateStars();
      }
      this.showResult();
    }
  }

  clearForm() {
    this.attempts = 0;
    this.isCorrect = false;
    this.isDisabled = false;
    this.showNextButton = false;
    // this.answerIsIncorrect = null;
    // this.answerIsCorrect = null;
    this.hideFeedback();
  }

  showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }

  // use a simple function (if you don't need to inject anything)
  // in exercise-util.ts
  // pass in chosenLevel

  // util function

  calculateStars(): void {
    this._currentLevelStars = Math.max(0, 5 - this.shared.incorrectAnswer);

    this.shared.studentData.levelStars[this.shared.topic][
      this.shared.chosenLevel - 1
    ] = Math.max(
      this.shared.studentData.levelStars[this.shared.topic][
        this.shared.chosenLevel - 1
      ],
      this._currentLevelStars
    );

    if (
      this.shared.chosenLevel === this.shared.currentLevel[this.shared.topic]
    ) {
      this.shared.currentLevel[this.shared.topic]++;
    }
  }

  checkDynamicAnswer(form: NgForm): boolean {
    const givenAnswer = form.value.givenAnswer;

    if (givenAnswer === this.answer) {
      return true;
    } else {
      return false;
    }
  }

  // private methods
}
