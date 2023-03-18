import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { map, Observable, tap } from 'rxjs';

import { SharedService } from '../../services/shared.service';
import { GetExercisesService } from '../../services/get-exercises.service';
import { CheckanswerService } from './services/checkanswer.service';
import { CheckDynamicAnswerService } from './services/checkdynamicanswer.service';
import { SaveanswerService } from './services/saveanswer.service';
import { StoreQuizService } from 'src/app/services/store-quiz.service';
import { StorePracticeService } from 'src/app/services/store-practice.service';

import { createExercise } from './create-exercise';
import { shuffleExercises } from './exercise-util';

import { Quiz } from './quiz';
import { QuizRecord } from './quizrecord';
import { Exercise } from './exercise';
import { ExerciseRecord } from './exerciserecord';

import { AppConfig } from '../../../appconfig';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  // public variables
  exercises$: Observable<Exercise[]>;
  exercises: Exercise[] = [];

  maxAttempts: number = AppConfig.maxAttempts;

  quiz: Quiz = {
    classLevel: this.shared.chosenLevel,
    chapter: this.shared.chapter,
    numberOfQuestions: AppConfig.quizQuestions,
    timeLimit: AppConfig.quizTimeLimit,
  };

  quizRecord: QuizRecord = {
    quiz: this.quiz,
    startTime: new Date(),
    endTime: null,
    correctAnswers: 0,
    incorrectAnswers: 0,
    streakCount: 0,
    currentQuestion: 0,
  };

  // currentQuestion: number = 0;
  // streakCount: number = 0;

  // exerciseRecord
  attempts: number = 0;
  isCorrect: boolean;

  // those should not be necessary
  question: string = '';
  answer: number;
  givenAnswer: number = undefined;
  lastAnswer: number = undefined;
  numerator: string = '';
  denominator: string = '';

  showNextButton: boolean = false;
  isDisabled: boolean;

  // private variables
  private _srcs: string[] = [];
  private _startTime: Date = new Date();
  private _endTime: Date;
  private _duration: number;
  private _feedbackIsShown: boolean = false;
  private _currentLevelStars: number;

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
    this._resetCounts();
    if (this.shared.mode === 'practice') {
      this.shared.totalSessionQuestions = AppConfig.practiceQuestions;
      let { question, answer, startTime } = createExercise(
        this.shared.chosenLevel,
        this.shared.topic
      );
      this.question = question;
      this.answer = answer;
      this._startTime = startTime;
      this._storePracticeService.storePracticeStart();
    } else {
      const quizStartDate = new Date();
      this.shared.setQuizStartTime(quizStartDate);
      this._storeQuizService.storeQuizStart();
      this.shared.countDownTimer();
      this.exercises$ = this._getExercisesService
        .getExercises()
        .pipe(map((exercises: Exercise[]) => shuffleExercises(exercises)))
        .pipe(
          tap((data: Exercise[]) => {
            this.shared.totalSessionQuestions = Math.min(
              AppConfig.quizQuestions,
              data.length
            );
            for (let exercise of data) {
              this.exercises.push(exercise);
              this._srcs.push('assets/img/geometry/' + exercise.img + '.jpg');
            }
          })
        );
    }
  }

  // public methods
  getSrc(): string {
    if (this._srcs.length === 0) {
      return null;
    }
    return this._srcs[this.quizRecord.currentQuestion];
  }

  onSubmitAnswer(form: NgForm, exercise?: Exercise) {
    this.lastAnswer = this.givenAnswer;
    if (form.valid) {
      this._trackDurationAndAttempts();

      if (this.shared.mode === 'practice') {
        this._saveDynamicAnswer(
          this._checkDynamicAnswerService.checkDynamicAnswer(form, this.answer)
        );
      } else if (exercise.answerType === 'integer') {
        const tmp = this._checkAnswerService.checkIntegerAnswer({
          form,
          exercise,
        });
        this.isCorrect = tmp;
        this._saveAnswer(tmp, exercise);
      } else {
        const givenAnswerFraction = {
          numerator: parseInt(form.value.numerator),
          denominator: parseInt(form.value.denominator),
        };
        const correctAnswerFraction = {
          numerator: parseInt(exercise.correctAnswerFraction.numerator),
          denominator: parseInt(exercise.correctAnswerFraction.denominator),
        };
        this._saveAnswer(
          this._checkAnswerService.checkFractionAnswer(
            givenAnswerFraction,
            correctAnswerFraction
          ),
          exercise
        );
      }
      this._showFeedback();
    }
  }

  onClickAnswer(option: any, exercise: Exercise): void {
    this._trackDurationAndAttempts();
    this._saveAnswer(!!option.isCorrect, exercise);
    this._showFeedback();
  }

  feedbackIsShown(): boolean {
    return this._feedbackIsShown;
  }

  nextExercise(): void {
    if (
      this.quizRecord.currentQuestion >=
      this.shared.totalSessionQuestions - 1
    ) {
      this._showResult();
    }
    this._clearForm();
    if (this.shared.mode === 'practice') {
      let { question, answer, startTime } = createExercise(
        this.shared.chosenLevel,
        this.shared.topic
      );
      this.question = question;
      this.answer = answer;
      this._startTime = startTime;
    }
    this.quizRecord.currentQuestion++;
    this._startTime = new Date();

    if (
      this.shared.correctAnswer + this.shared.incorrectAnswer >=
      this.shared.totalSessionQuestions
    ) {
      if (this.shared.mode === 'practice') {
        this._calculateStars();
      }
      this._showResult();
    }
  }

  // private methods
  private _resetCounts(): void {
    this.shared.correctAnswer = 0;
    this.shared.incorrectAnswer = 0;
    this.quizRecord.streakCount = 0;
    this.attempts = 0;
  }

  private _trackDurationAndAttempts(): void {
    // TODO; performance API https://developer.mozilla.org/en-US/docs/Web/API/Performance
    this._endTime = new Date();
    this._duration = this._endTime.getTime() - this._startTime.getTime();
    this.attempts++;
  }

  private _incrementStreakCount(): void {
    this.quizRecord.streakCount++;
  }

  private _saveAnswer(isCorrect: boolean, exercise: Exercise): void {
    const exerciseRecord: ExerciseRecord = {
      exercise,
      duration: this._duration,
      attempts: this.attempts,
      answerIsCorrect: isCorrect,
    };

    this._saveAnswerService.saveAnswer(exerciseRecord);
    if (isCorrect) {
      if (this.attempts === 1) {
        this._incrementStreakCount();
        this.shared.incrementCorrectAnswer();
      }
      this.isDisabled = true;
      this.isCorrect = true;
      this.showNextButton = true;
    } else {
      if (this.attempts === 1) {
        this.shared.incorrectAnswer++;
        this.quizRecord.streakCount = 0;
      }
      if (
        this.attempts >= AppConfig.maxAttempts &&
        exercise.answerType !== 'mc'
      ) {
        this.showNextButton = true;
        this.isDisabled = true;
      }
    }
    this._storeAnswer(isCorrect, exercise.id);
    return;
  }

  private _storeAnswer(isCorrect: boolean, currentQuestionId: string): void {
    this._storeQuizService.storeAnswer(
      currentQuestionId,
      isCorrect,
      this._duration,
      this.attempts,
      this._startTime,
      this._endTime
    );
  }

  private _saveDynamicAnswer(isCorrect: boolean): void {
    if (isCorrect) {
      this.isCorrect = true;
      if (this.attempts === 1) {
        this._incrementStreakCount();
        this.shared.correctAnswer++;
      }
      this.isDisabled = true;
      this.showNextButton = true;
    } else {
      this.isCorrect = false;
      if (this.attempts === 1) {
        this.shared.incorrectAnswer++;
      }
      this.quizRecord.streakCount = 0;
      if (this.attempts >= AppConfig.maxAttempts) {
        this.showNextButton = true;
        this.isDisabled = true;
      }
    }
    this._storeDynamicAnswer(isCorrect);
    return;
  }

  private _storeDynamicAnswer(isCorrect: boolean): void {
    this._storePracticeService.storeDynamicAnswer(
      this.question,
      this.answer,
      this.givenAnswer,
      isCorrect,
      this._duration,
      this.shared.chosenLevel,
      this.attempts
    );
  }

  private _showFeedback(): void {
    this._feedbackIsShown = true;
  }

  private _hideFeedback(): void {
    this._feedbackIsShown = false;
  }

  private _clearForm(): void {
    this.givenAnswer = null;
    this.numerator = null;
    this.denominator = null;
    this.attempts = 0;
    this.isCorrect = false;
    this.isDisabled = false;
    this.showNextButton = false;
    this._hideFeedback();
  }

  private _showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }

  private _calculateStars(): void {
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
}
