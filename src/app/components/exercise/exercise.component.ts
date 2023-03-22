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
import { shuffleExercises, shuffleExercises2 } from './exercise-util';

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
  incorrectExercises: Exercise[] = [];

  currentDifficultyLevel: number = 10;

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
    userQuestion: 0,
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
  lastAnswer: string = '';
  numerator: string = '';
  denominator: string = '';
  givenNumerator: string = '';
  givenDenominator: string = '';

  showNextButton: boolean = false;
  isDisabled: boolean;

  showHint: boolean = false;

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
      if (this.shared.getChapter() === 100) {
        console.log('chapter 100');
        this.exercises$ = this._getExercisesService
          .getExercises()
          // .pipe(map((exercises: Exercise[]) => shuffleExercises(exercises)))
          .pipe(
            tap((data: Exercise[]) => {
              const groups = data.reduce((acc, exercise) => {
                const key = `${exercise.classLevel}:${exercise.chapter}:${exercise.subChapter}:${exercise.questionNumber}`;
                if (!acc[key]) {
                  acc[key] = [];
                }
                acc[key].push(exercise);
                return acc;
              }, {});
              console.log(this.exercises);
              console.log(groups);
              this.shared.totalSessionQuestions = Math.min(
                AppConfig.quizQuestions,
                Object.keys(groups).length
              );
              for (let key in groups) {
                const versions = groups[key].map(
                  (exercise) => exercise.version
                );
                const numVersions = Math.max(...versions);
                const version = Math.floor(Math.random() * numVersions) + 1;
                groups[key].forEach((exercise) => {
                  exercise.version = version;
                  this.exercises.push(exercise);
                  this._srcs.push(
                    'assets/img/geometry/' + exercise.img + '.jpg'
                  );
                });
              }
            })
          ); /*
        this.exercises$ = this._getExercisesService
          .getExercises()
          //.pipe(map((exercises: Exercise[]) => shuffleExercises2(exercises)))
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
              this.findNextSuitableExercise();
            })
          );
        this.exercises$ = this._getExercisesService.getExercises().pipe(
          tap((data: Exercise[]) => {
            console.log('tap');
            const versions = {};
            const groups = data.reduce((acc, exercise) => {
              const questionNumber = exercise.questionNumber;
              if (!versions[questionNumber]) {
                versions[questionNumber] = exercise.numVersions;
              }
              if (!acc[questionNumber]) {
                acc[questionNumber] = [];
              }
              acc[questionNumber].push(exercise);
              console.log(acc);
              return acc;
            }, {});
            this.shared.totalSessionQuestions = Math.min(
              AppConfig.quizQuestions,
              data.length
            );
            for (let questionNumber in groups) {
              const numVersions = versions[questionNumber];
              const version = Math.floor(Math.random() * numVersions) + 1;
              groups[questionNumber].forEach((exercise) => {
                if (exercise.questionNumber === questionNumber) {
                  exercise.version = version;
                  this.exercises.push(exercise);
                  this._srcs.push(
                    'assets/img/geometry/' + exercise.img + '.jpg'
                  );
                }
              });
            }
          })
        ); */
      } else if (this.shared.getChapter() === 99) {
        console.log('chapter 99');
        this.exercises$ = this._getExercisesService
          .getExercises()
          .pipe(map((exercises: Exercise[]) => shuffleExercises2(exercises)))
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
              this.findNextSuitableExercise();
            })
          );
      } else {
        console.log('normal chapter');
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
  }

  // public methods
  getSrc(): string {
    if (this._srcs.length === 0) {
      return null;
    }
    return this._srcs[this.quizRecord.currentQuestion];
  }

  onSubmitAnswer(form: NgForm, exercise?: Exercise) {
    if (form.valid) {
      this._trackDurationAndAttempts();
      if (this.shared.mode === 'practice') {
        this._saveDynamicAnswer(
          this._checkDynamicAnswerService.checkDynamicAnswer(form, this.answer)
        );
      } else if (exercise.answerType === 'integer') {
        this.lastAnswer = this.givenAnswer.toString();
        const tmp = this._checkAnswerService.checkIntegerAnswer({
          form,
          exercise,
        });
        this.exercises[this.quizRecord.currentQuestion].answeredCorrectly = tmp;
        if (!tmp && this.attempts === 1) {
          this.exercises.push(this.exercises[this.quizRecord.currentQuestion]);
          /* 
        this.incorrectExercises.splice(0, 1);
          console.log(this.exercises[this.quizRecord.currentQuestion]);
          this.incorrectExercises.push(
            this.exercises[this.quizRecord.currentQuestion]
          );
          */
        }
        this.isCorrect = tmp;
        this._saveAnswer(tmp, exercise);
      } else {
        this.lastAnswer = form.value.numerator + '/' + form.value.denominator;
        const givenAnswerFraction = {
          numerator: parseInt(form.value.numerator),
          denominator: parseInt(form.value.denominator),
        };
        const correctAnswerFraction = {
          numerator: parseInt(exercise.correctAnswerFraction.numerator),
          denominator: parseInt(exercise.correctAnswerFraction.denominator),
        };
        const tmp = this._checkAnswerService.checkFractionAnswer(
          givenAnswerFraction,
          correctAnswerFraction
        );
        if (tmp) {
          this.exercises[this.quizRecord.currentQuestion].answeredCorrectly =
            tmp;
        }
        this._saveAnswer(
          this._checkAnswerService.checkFractionAnswer(
            givenAnswerFraction,
            correctAnswerFraction
          ),
          exercise
        );
      }
      this._showFeedback(form);
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
    console.log(this.quizRecord.currentQuestion);
    console.log(this.exercises[this.quizRecord.currentQuestion]);
    if (this.quizRecord.userQuestion >= this.shared.totalSessionQuestions - 1) {
      this._showResult();
    }
    if (
      this.shared.mode === 'quiz' &&
      this.quizRecord.currentQuestion >= this.exercises.length - 1
    ) {
      this.quizRecord.currentQuestion = 0;
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
    if (
      this.quizRecord.streakCount === 3 &&
      this.incorrectExercises.length > 0
    ) {
      /*
      this.exercises.splice(
        this.quizRecord.currentQuestion + 1,
        0,
        this.incorrectExercises[0]
      );
      for (
        let i = this.exercises.length - 1;
        i > this.quizRecord.currentQuestion;
        i--
      ) {
        let temp = this.exercises[i];
        this.exercises[i] = this.exercises[i - 1];
        this.exercises[i - 1] = temp;
      }
      this.incorrectExercises.splice(0, 1);
      */
    }
    this.quizRecord.currentQuestion++;
    this.quizRecord.userQuestion++;
    if (this.shared.getChapter() === 99) {
      this.increaseDifficulty();
      if (this.shared.mode === 'quiz') {
        this.findNextSuitableExercise();
      }
    }

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

  findNextSuitableExercise(): void {
    if (this.quizRecord.currentQuestion >= this.exercises.length - 1) {
      this.quizRecord.currentQuestion = 0;
    }
    while (
      (this.exercises[this.quizRecord.currentQuestion].difficulty >
        this.currentDifficultyLevel ||
        this.exercises[this.quizRecord.currentQuestion].difficulty + 10 <=
          this.currentDifficultyLevel) &&
      !this.exercises[this.quizRecord.currentQuestion].answeredCorrectly
    ) {
      this.quizRecord.currentQuestion++;
    }
  }

  increaseDifficulty(): void {
    if (
      this.shared.correctAnswer /
        (this.shared.correctAnswer + this.shared.incorrectAnswer) >
        0.9 &&
      this.shared.correctAnswer + this.shared.incorrectAnswer >
        this.currentDifficultyLevel / 2
    ) {
      this.currentDifficultyLevel += 10;
    } else if (
      this.shared.correctAnswer /
        (this.shared.correctAnswer + this.shared.incorrectAnswer) <
      0.6
    ) {
      if (this.currentDifficultyLevel > 10) {
        this.currentDifficultyLevel -= 10;
      }
    }
  }

  skipExercise(): void {
    // this.quizRecord.incorrectAnswers++;
    // this.shared.incorrectAnswer++;
    this.nextExercise();
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

  private _showFeedback(form?: NgForm): void {
    this._feedbackIsShown = true;
    if (form) {
      form.reset();
    }
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
    this.showHint = false;
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
