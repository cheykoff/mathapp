import { Component, OnInit } from '@angular/core';
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

  // tick = 1000;
  // penaltyCountDown: Subscription;
  // penalty: number = 5;
  // penaltyCount: number = 0;

  showNextButton: boolean = false;

  constructor(
    public shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    // this.exercises$ = this._dataService.getAllExercises(); // For homework at 16.11.2022
    // .pipe(map((exercises: Exercise2[]) => this.shuffleExercises(exercises))); // pipe to shuffle exercises
    this.resetCounts();

    if (this.shared.mode === 'practice') {
      this.createExercise();
      this._dataService.storePracticeStart();
    } else {
      this.exercises$ = this._dataService.getExercisesByQuizTemplateId();
      this._dataService.storeQuizStart();
    }

    // this.createExercise(this.shared.chosenLevel);
  }

  resetCounts(): void {
    console.log('resetCounts');
    this.shared.correctAnswer = 0;
    this.shared.incorrectAnswer = 0;
    this.streakCount = 0;
    this.attempts = 0;
  }

  shuffleExercises(exercises: Exercise[]): Exercise[] {
    console.log('shuffleExercises');
    for (let i = exercises.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [exercises[i], exercises[j]] = [exercises[j], exercises[i]];
    }
    return exercises;
  }

  onSubmitAnswer(form: NgForm, exercise?: Exercise) {
    console.log('onSubmitAnswer');
    this.trackDurationAndAttempts();
    this.checkAnswer(form, exercise);
    form.reset();
  }

  checkAnswer(form: NgForm, exercise?: Exercise): void {
    console.log('checkAnswer');
    if (this.shared.mode === 'practice') {
      this.saveDynamicAnswer(this.checkDynamicAnswer(form));
    } else if (exercise.answerType === 'integer') {
      this.saveAnswer(this.checkIntegerAnswer(form, exercise), exercise);
    } else {
      this.saveAnswer(this.checkFractionAnswer(form, exercise), exercise);
    }
  }

  checkFractionAnswer(form: NgForm, exercise?: Exercise): boolean {
    console.log('check fraction');
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
    console.log('check integer');
    const givenAnswer = form.value.givenAnswer;
    if (
      givenAnswer.toString().replace('.', ',').trim() === exercise.correctAnswer
    ) {
      return true;
    } else {
      return false;
    }
  }

  onClickAnswer(option: any, exercise: Exercise): void {
    console.log('onClickAnswer - mc');
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
    console.log('trackDurationAndAttempts');
    // TODO; performance API https://developer.mozilla.org/en-US/docs/Web/API/Performance
    console.log(this.startTime);
    this.endTime = new Date();
    this.duration = this.endTime.getTime() - this.startTime.getTime();
    this.attempts++;
  }

  saveAnswer(isCorrect: boolean, exercise: Exercise): void {
    console.log('saveAnswer');
    if (isCorrect) {
      if (this.attempts === 1) {
        this.streakCount++;
        this.shared.correctAnswer++;
      }
      this.isDisabled = true;
      this.showFeedback(true);
      this.showNextButton = true;
    } else {
      console.log('integer incorrect');
      if (this.attempts === 1) {
        this.shared.incorrectAnswer++;
        this.streakCount = 0;
      }
      this.showFeedback(false);

      if (this.attempts >= this.maxAttempts && exercise.answerType !== 'mc') {
        console.log('integer incorrect: max attempts reached');
        this.showNextButton = true;
        this.isDisabled = true;
      }
    }
    this.storeAnswer(isCorrect, exercise.id);
    return;
  }

  storeAnswer(isCorrect: boolean, currentQuestionId: string): void {
    console.log('storeAnswer');
    console.log('currentQuestionId: ' + currentQuestionId);
    console.log('isCorrect: ' + isCorrect);
    console.log('duration: ' + this.duration);
    console.log('attempts: ' + this.attempts);

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
    console.log('saveDynamicAnswer');
    if (isCorrect) {
      console.log('correct answer');
      if (this.attempts === 1) {
        this.streakCount++;
        this.shared.correctAnswer++;
      }
      this.storeDynamicAnswer(true);
      this.isDisabled = true;
      this.showFeedback(true);
      this.showNextButton = true;
      return;
    } else {
      console.log('incorrect answer');
      if (this.attempts === 1) {
        this.shared.incorrectAnswer++;
        this.streakCount = 0;
      }
      this.streakCount = 0;
      this.storeDynamicAnswer(false);
      this.showFeedback(false);

      if (this.attempts >= this.maxAttempts) {
        console.log('dynamic incorrect: max attempts reached');
        this.showNextButton = true;
        this.isDisabled = true;
      }
      this.storeDynamicAnswer(isCorrect);
      return;
    }
  }

  storeDynamicAnswer(isCorrect: boolean): void {
    console.log('storeDynamicAnswer');
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
    console.log('showFeedback');
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
    if (this.currentQuestion >= this.totalQuestions - 1) {
      console.log('total questions reached');
      this.showResult();
    }
    console.log('nextExercise');
    this.clearForm();
    if ((this.shared.mode = 'practice')) {
      this.createExercise();
    }
    this.currentQuestion++;
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
    console.log('clearForm');
    this.attempts = 0;
    this.isCorrect = false;
    this.isDisabled = false;
    this.showNextButton = false;
    this.answerIsIncorrect = false;
    this.answerIsCorrect = false;
  }

  showResult(): void {
    console.log('showResult');
    this._router.navigate(['/', 'resultpage']);
  }

  onFocusEvent(event: any) {
    console.log('onFocusEvent');
    this.answerIsIncorrect = false;
  }

  createExercise(): void {
    console.log('createExercise');
    const level = this.shared.chosenLevel;
    const topic = this.shared.topic;
    console.log('topic: ' + topic);
    console.log('level: ' + level);
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
    console.log('minNum: ' + minNum);
    console.log('maxNum: ' + maxNum);
    const a = this.getRandInteger(minNum, maxNum);
    const b = this.getRandInteger(minNum, maxNum);
    console.log('a: ' + a);
    console.log('b: ' + b);
    if (topic === 'Addition') {
      this.question = `${a} + ${b} = ?`;
      console.log('question: ' + this.question);
      this.answer = a + b;
      console.log('answer: ' + this.answer);
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
    console.log('getRandInteger');
    return Math.round(Math.random() * (max - min) + min);
  }

  calculateStars(): void {
    console.log('calculateStars');
    console.log('topic: ' + this.shared.topic);
    console.log('level: ' + this.shared.chosenLevel);
    console.log(
      'levelstars before:' +
        this.shared.levelStars[this.shared.topic][this.shared.chosenLevel - 1]
    );

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
    console.log(
      'levelstars after:' +
        this.shared.levelStars[this.shared.topic][this.shared.chosenLevel - 1]
    );
  }

  checkDynamicAnswer(form: NgForm): boolean {
    console.log('check dynamic');
    const givenAnswer = form.value.givenAnswer;

    if (givenAnswer === this.answer) {
      return true;
    } else {
      return false;
    }
    /*
      console.log('dynamic correct');
      this.isCorrect = true;
      this.answerIsCorrect = true;
      this.answerIsIncorrect = false;
      this.shared.correctAnswer++;
      this.isDisabled = true;
      this.streakCount++;

      setTimeout(() => {
        this.currentQuestion++;
        this.startTime = new Date();
        this.answerIsCorrect = false;
        this.isDisabled = false;
        //this.showNextButton = true;
        this.attempts = 0;

        if (this.currentQuestion >= this.totalQuestions) {
          this.showResult();
        }
      }, 1000);
    } else {
      console.log('dynamic incorrect');
      this.attempts++;
      if (this.attempts >= this.maxAttempts) {
        console.log('dynamic incorrect: max attempts reached');
        this.isDisabled = true;
        // this.storeAnswer(false, givenAnswer);
        this.showNextButton = true;
        this.attempts = 0;
      }
      this.isCorrect = false;
      this.answerIsIncorrect = true;
      this.shared.incorrectAnswer++;
      this.streakCount = 0;
      setTimeout(() => {
        this.answerIsIncorrect = false;
      }, 1000);
    }
    this.trackDurationAndAttempts();
    console.log(this.question);
    console.log(this.answer);
    console.log(this.givenAnswer);
    console.log(this.isCorrect);
    console.log(this.duration);
    console.log(this.shared.chosenLevel);

    this._dataService.storeDynamicAnswer(
      this.question,
      this.answer,
      this.givenAnswer,
      this.isCorrect,
      this.duration,
      this.shared.chosenLevel,
      this.attempts
    );

    console.log(this.shared.correctAnswer);
    console.log(this.shared.incorrectAnswer);
    return;
    */
  }
}
