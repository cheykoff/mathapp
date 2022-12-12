import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { from, map, Observable, Subscription, timer } from 'rxjs';
import { NgForm } from '@angular/forms';

import { SharedService } from '../../shared/shared.service';
import { Exercise } from '../../shared/exercise';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  exercises$: Observable<Exercise[]>;

  totalQuestions: number = 10;
  maxAttempts: number = 3;

  srcs: string[] = [];

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
  answerIsCorrect: boolean = false;
  answerIsIncorrect: boolean = false;

  correctAnswer: string = '';
  isDisabled: boolean;

  showNextButton: boolean = false;

  constructor(
    public shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  /*
  ngOnChanges(): void {
    console.log('ngOnChanges');
    this.exercises$.subscribe((data: Exercise[]) => {
      this.exercise = data[0];
      this.src = '../assets/img/geometry/' + this.exercise.img;
    });
  }
  */

  ngOnInit(): void {
    console.log('ngOnInit');
    this.resetCounts();
    if (this.shared.mode === 'practice') {
      this.createExercise();
      this._dataService.storePracticeStart();
    } else {
      const quizStartDate = new Date();
      this.shared.setQuizStartTime(quizStartDate);
      // this.exercises$ = this._dataService.getExercisesByQuizTemplateId();
      console.log('get exercises');
      // this.exercises$ = this._dataService.getExercisesGisela6b221213();
      // this.exercises$ = this._dataService.getExercisesGisela6b221213();
      console.log('store quiz start');
      this._dataService.storeQuizStart();
      console.log('currentQuestion: ' + this.currentQuestion);
      // this.exercises$ = this._dataService.getExercises();
      this.exercises$ = this._dataService.getExercisesGisela6b221213();

      this.exercises$.subscribe((data: Exercise[]) => {
        this.totalQuestions = Math.min(this.totalQuestions, data.length);
        for (let exercise of data) {
          this.exercises.push(exercise);
          this.srcs.push('../assets/img/geometry/' + exercise.img);
        }
      });
    }

    // this.createExercise(this.shared.chosenLevel);
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
    console.log(form);
    console.log(exercise);
    const givenNumber = parseInt(form.value.givenAnswer);
    if (isNaN(givenNumber)) {
      return;
    }
    this.trackDurationAndAttempts();
    this.checkAnswer(form, exercise);
    form.reset();
  }

  checkAnswer(form: NgForm, exercise?: Exercise): void {
    console.log('checkAnswer: mode: ' + this.shared.mode);
    if (this.shared.mode === 'practice') {
      this.saveDynamicAnswer(this.checkDynamicAnswer(form));
    } else if (exercise.answerType === 'integer') {
      this.saveAnswer(this.checkIntegerAnswer(form, exercise), exercise);
    } else {
      this.saveAnswer(this.checkFractionAnswer(form, exercise), exercise);
    }
  }

  checkFractionAnswer(form: NgForm, exercise?: Exercise): boolean {
    const correctDenominator = exercise.correctAnswerFraction.denominator;
    const correctNumerator = exercise.correctAnswerFraction.numerator;
    const givenDenominator = form.value.denominator;
    const givenNumerator = form.value.numerator;

    if (
      parseInt(givenDenominator) === parseInt(correctDenominator) &&
      parseInt(givenNumerator) === parseInt(correctNumerator)
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkIntegerAnswer(form: NgForm, exercise?: Exercise): boolean {
    const givenAnswer = form.value.givenAnswer;
    if (
      givenAnswer.toString().replace('.', ',').trim() === exercise.correctAnswer
    ) {
      console.log(givenAnswer.toString().replace('.', ',').trim());
      console.log(exercise.correctAnswer);
      return true;
    } else {
      return false;
    }
  }

  onClickAnswer(option: any, exercise: Exercise): void {
    this.trackDurationAndAttempts();

    this.getCorrectAnswer(exercise);
    this.saveAnswer(option.isCorrect, exercise);
  }

  getCorrectAnswer(exercise: Exercise): void {
    exercise.answerOptions.forEach((answerOption) => {
      if (answerOption.isCorrect) {
        this.correctAnswer = answerOption.answerText;
      }
    });
  }

  trackDurationAndAttempts(): void {
    // TODO; performance API https://developer.mozilla.org/en-US/docs/Web/API/Performance
    this.endTime = new Date();
    this.duration = this.endTime.getTime() - this.startTime.getTime();
    this.attempts++;
  }

  saveAnswer(isCorrect: boolean, exercise: Exercise): void {
    if (isCorrect) {
      if (this.attempts === 1) {
        this.streakCount++;
        this.shared.correctAnswer++;
      }
      this.isDisabled = true;
      this.showFeedback(true);
      this.showNextButton = true;
    } else {
      if (this.attempts === 1) {
        this.shared.incorrectAnswer++;
        this.streakCount = 0;
      }
      this.showFeedback(false);

      if (this.attempts >= this.maxAttempts && exercise.answerType !== 'mc') {
        this.showNextButton = true;
        this.isDisabled = true;
      }
    }
    this.storeAnswer(isCorrect, exercise.id);
    return;
  }

  storeAnswer(isCorrect: boolean, currentQuestionId: string): void {
    console.log('store answer');
    this._dataService.storeAnswer(
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
      if (this.attempts === 1) {
        this.streakCount++;
        this.shared.correctAnswer++;
      }
      this.isDisabled = true;
      this.showFeedback(true);
      this.showNextButton = true;
    } else {
      if (this.attempts === 1) {
        this.shared.incorrectAnswer++;
        this.streakCount = 0;
      }
      this.streakCount = 0;
      this.showFeedback(false);
      if (this.attempts >= this.maxAttempts) {
        this.showNextButton = true;
        this.isDisabled = true;
      }
    }
    this.storeDynamicAnswer(isCorrect);
    return;
  }

  storeDynamicAnswer(isCorrect: boolean): void {
    console.log('store dynamic answer');
    this._dataService.storeDynamicAnswer(
      this.question,
      this.answer,
      this.givenAnswer,
      isCorrect,
      this.duration,
      this.shared.chosenLevel,
      this.attempts
    );
  }

  showFeedback(correctAnswer: boolean): void {
    if (correctAnswer) {
      this.answerIsCorrect = true;
      this.answerIsIncorrect = false;
    } else {
      this.answerIsCorrect = false;
      this.answerIsIncorrect = true;
    }
  }

  nextExercise(): void {
    console.log('nextExercise');
    console.log(this.currentQuestion);
    console.log(this.totalQuestions);
    if (this.currentQuestion >= this.totalQuestions - 1) {
      console.log('showResult');
      this.showResult();
    }
    this.clearForm();
    if (this.shared.mode === 'practice') {
      this.createExercise();
    }
    console.log('currentQuestion', this.currentQuestion);
    this.currentQuestion++;
    console.log('currentQuestion', this.currentQuestion);
    this.startTime = new Date();

    if (
      this.shared.correctAnswer + this.shared.incorrectAnswer >=
      this.totalQuestions
    ) {
      this.calculateStars();
      this.showResult();
    }
  }

  clearForm() {
    this.attempts = 0;
    this.isCorrect = false;
    this.isDisabled = false;
    this.showNextButton = false;
    this.answerIsIncorrect = false;
    this.answerIsCorrect = false;
  }

  showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }

  onFocusEvent(event: any) {
    this.answerIsIncorrect = false;
  }

  createExercise(): void {
    const level = this.shared.chosenLevel;
    const topic = this.shared.topic;
    this.startTime = new Date();
    let minNum = 0;
    let maxNum = 0;
    if (level === 1) {
      minNum = 1;
      maxNum = 10;
    } else if (level === 2) {
      if (topic === 'Addition' || topic === 'Subtraction') {
        minNum = 1;
        maxNum = 100;
      } else {
        minNum = 1;
        maxNum = 20;
      }
    } else if (level === 3) {
      if (topic === 'Addition' || topic === 'Subtraction') {
        minNum = 1;
        maxNum = 1000;
      } else {
        minNum = 1;
        maxNum = 50;
      }
    } else {
      if (topic === 'Addition' || topic === 'Subtraction') {
        minNum = 1;
        maxNum = 10000;
      } else {
        minNum = 1;
        maxNum = 100;
      }
    }
    const a = this.getRandInteger(minNum, maxNum);
    const b = this.getRandInteger(minNum, maxNum);
    if (topic === 'Addition') {
      this.question = `${a} + ${b} = ?`;
      this.answer = a + b;
    } else if (topic === 'Subtraktion') {
      if (a > b) {
        this.question = `${a} - ${b} = ?`;
        this.answer = a - b;
      } else {
        this.question = `${b} - ${a} = ?`;
        this.answer = b - a;
      }
    } else if (topic === 'Multiplikation') {
      this.question = `${a} ⋅ ${b} = ?`;
      this.answer = a * b;
    } else if (topic === 'Division') {
      const c = a * b;
      this.question = `${c} : ${a} = ?`;
      this.answer = b;
    }

    return;
  }

  getRandInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  calculateStars(): void {
    this.shared.currentLevelStars = Math.max(
      // TODO: Remove the variable?
      0,
      5 - this.shared.incorrectAnswer
    );

    this.shared.levelStars[this.shared.topic][this.shared.chosenLevel - 1] =
      Math.max(
        this.shared.levelStars[this.shared.topic][this.shared.chosenLevel - 1],
        this.shared.currentLevelStars
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
}
