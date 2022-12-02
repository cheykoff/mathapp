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
  currentQuestion: number = 0;
  totalQuestions: number = 4;
  givenAnswer: number = undefined;
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
  isCorrect: boolean;
  showNextButton: boolean = false;

  constructor(
    public shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  onFocusEvent(event: any) {
    this.answerIsIncorrect = false;
  }

  ngOnInit(): void {
    // this.exercises$ = this._dataService.getAllExercises(); // For homework at 16.11.2022
    // .pipe(map((exercises: Exercise2[]) => this.shuffleExercises(exercises))); // pipe to shuffle exercises
    this.exercises$ = this._dataService.getExercisesByQuizTemplateId();

    // this.createExercise(this.shared.chosenLevel);
    this.shared.correctAnswer = 0;
    this.shared.incorrectAnswer = 0;
  }

  question: string = '';
  answer: number = 2;
  // answerType: string = 'dynamic';

  createExercise(level: number): void {
    this.startTime = new Date();
    let minNum = undefined;
    let maxNum = undefined;
    if (level <= 4) {
      minNum = 1;
      maxNum = 10;
    } else if (level <= 6) {
      minNum = 1;
      maxNum = 100;
    } else if (level <= 8) {
      minNum = 1;
      maxNum = 20;
    } else {
      minNum = 1;
      maxNum = 10000;
    }
    const a = this.getRandInteger(minNum, maxNum);
    const b = this.getRandInteger(minNum, maxNum);
    if (level % 4 === 1) {
      this.question = `${a} + ${b} = ?`;
      this.answer = a + b;
    } else if (level % 4 === 2) {
      if (a > b) {
        this.question = `${a} - ${b} = ?`;
        this.answer = a - b;
      } else {
        this.question = `${b} - ${a} = ?`;
        this.answer = b - a;
      }
    } else if (level % 4 === 3) {
      this.question = `${a} ⋅ ${b} = ?`;
      this.answer = a * b;
    } else if (level % 4 === 0) {
      const c = a * b;
      this.question = `${c} : ${a} = ?`;
      this.answer = b;
    }

    return;
  }

  getRandInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
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

  onSubmitAnswer(form: NgForm, exercise?: Exercise) {
    this.endTime = new Date();
    this.duration = this.endTime.getTime() - this.startTime.getTime();

    if (exercise.answerType === 'dynamic') {
      console.log('dynamic');
      const givenAnswer = form.value.givenAnswer;
      console.log('correct answer: ', this.answer);
      console.log('given answer: ', form.value.givenAnswer);
      if (givenAnswer === exercise.correctAnswer) {
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

        return true;
      } else {
        console.log('dynamic incorrect');
        this.attempts++;
        if (this.attempts >= this.maxAttempts) {
          console.log('dynamic incorrect: max attempts reached');
          this.isDisabled = true;
          this.storeAnswer(false, exercise.id);
          this.showNextButton = true;
          this.attempts = 0;
          return false;
        }
        this.isCorrect = false;
        this.answerIsIncorrect = true;
        this.shared.incorrectAnswer++;
        this.streakCount = 0;
        setTimeout(() => {
          this.answerIsIncorrect = false;
        }, 1000);
        return false;
      }

      console.log(this.shared.correctAnswer);
      console.log(this.shared.incorrectAnswer);
      /*
      this._dataService.storeDynamicAnswer(
        this.question,
        this.answer,
        this.givenAnswer,
        this.isCorrect,
        this.duration,
        this.shared.chosenLevel
      );
      */
    }

    if (exercise.answerType === 'fraction') {
      console.log('fraction');
      const correctDenominator = exercise.correctAnswerFraction.denominator;
      const correctNumerator = exercise.correctAnswerFraction.numerator;
      const givenDenominator = form.value.denominator;
      const givenNumerator = form.value.numerator;

      if (
        parseInt(givenDenominator) === parseInt(correctDenominator) &&
        parseInt(givenNumerator) === parseInt(correctNumerator)
      ) {
        console.log('fraction correct');
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
          this.startTime = new Date();
          this.denominator = '';
          this.numerator = '';
          this.answerIsCorrect = false;
          this.attempts = 0;
          if (this.currentQuestion >= this.totalQuestions) {
            this.showResult();
          }
        }, 1000);
        return true;
      }
      console.log('fraction incorrect');
      if (this.attempts === 0) {
        this.shared.incorrectAnswer++;
      }
      this.attempts++;
      if (this.attempts >= this.maxAttempts) {
        console.log('fraction incorrect: max attempts reached');
        this.isDisabled = true;
        this.storeAnswer(false, exercise.id);
        this.attempts = 0;
        this.showNextButton = true;
      }
      this.answerIsIncorrect = true;
      this.answerIsCorrect = false;
      this.answerPossible = false;
      this.streakCount = 0;
      setTimeout(() => {
        this.answerIsIncorrect = false;
        this.answerIsCorrect = false;
        this.answerPossible = true;
      }, 1000);

      // this.penaltyTimer();
      return false;
    }

    const givenAnswer = form.value.givenAnswer;
    if (exercise.answerType === 'integer') {
      console.log('integer');
      if (
        givenAnswer.toString().replace('.', ',').trim() ===
        exercise.correctAnswer
      ) {
        console.log('integer correct');
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
        this.answerPossible = true;

        setTimeout(() => {
          this.currentQuestion++;
          this.startTime = new Date();
          this.answerIsCorrect = false;
          // this.givenAnswer = '';
          this.attempts = 0;
          if (this.currentQuestion >= this.totalQuestions) {
            console.log('total questions reached');
            this.showResult();
          }
        }, 1000);

        if (this.currentQuestion >= this.totalQuestions) {
          console.log('total questions reached');
          this.showResult();
        }
        return true;
      }
      console.log('integer incorrect');
      if (this.attempts === 0) {
        this.shared.incorrectAnswer++;
      }
      this.attempts++;
      if (this.attempts >= this.maxAttempts) {
        console.log('integer - max attempts reached');
        this.isDisabled = true;
        this.storeAnswer(false, exercise.id);
        this.showNextButton = true;
        this.attempts = 0;
      }
      this.answerIsIncorrect = true;
      this.answerIsCorrect = false;
      this.answerPossible = false;
      this.streakCount = 0;
      setTimeout(() => {
        this.answerIsIncorrect = false;
        this.answerIsCorrect = false;
        this.answerPossible = true;
        this.isDisabled = false;
      }, 1000);
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
    console.log('onClickAnswer - mc');
    // TODO; performance API https://developer.mozilla.org/en-US/docs/Web/API/Performance
    this.attempts++;
    this.endTime = new Date();
    this.duration = this.endTime.getTime() - this.startTime.getTime();
    this.getCorrectAnswer(exercise);
    const exerciseSolved = this._checkAnswer(option.isCorrect);
    this.storeAnswer(exerciseSolved, exercise.id);
    if (exerciseSolved) {
      this.nextExercise();
    }

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
    if (this.currentQuestion >= this.totalQuestions) {
      console.log('total questions reached');
      this.showResult();
    }
    console.log('nextExercise');
    this.isCorrect = false;
    this.isDisabled = false;
    this.showNextButton = false;
    this.answerIsIncorrect = false;
    this.answerIsCorrect = false;
    this.currentQuestion++;
    /*
    if (this.shared.correctAnswer >= this.totalQuestions) {
      if (this.shared.incorrectAnswer === 0) {
        this.shared.levelStars[this.shared.chosenLevel] = 5;
      } else if (this.shared.incorrectAnswer <= 1) {
        this.shared.levelStars[this.shared.chosenLevel] = 4;
      } else if (this.shared.incorrectAnswer <= 2) {
        this.shared.levelStars[this.shared.chosenLevel] = 3;
      } else if (this.shared.incorrectAnswer <= 3) {
        this.shared.levelStars[this.shared.chosenLevel] = 2;
      } else if (this.shared.incorrectAnswer <= 4) {
        this.shared.levelStars[this.shared.chosenLevel] = 1;
      } else {
        this.shared.levelStars[this.shared.chosenLevel] = 0;
      }
      if (this.shared.chosenLevel === this.shared.currentLevel) {
        this.shared.currentLevel++;
      }
      this.showResult();
    } else {
      this.createExercise(this.shared.currentLevel);
      this.isCorrect;
      this.givenAnswer = undefined;
    }
    */
    if (this.shared.correctAnswer >= this.totalQuestions) {
      this.showResult();
    }
  }
  /*
    this.currentQuestion++;
    this.answerIsCorrect = false;
    this.answerIsIncorrect = false;
    this.isDisabled = false;
    this.attempts = 0;
    this.answerPossible = true;
    // this.givenAnswer = 0;
    this.numerator = '';
    this.denominator = '';
  }
  */
  showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }
}
