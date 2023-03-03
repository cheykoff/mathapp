import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Exercise } from 'src/app/components/exercise/exercise';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class CheckanswerService {
  constructor(public shared: SharedService) {}

  checkIntegerAnswer({
    form,
    exercise,
  }: {
    form: NgForm;
    exercise?: Exercise;
  }): boolean {
    const givenAnswer = form.value.givenAnswer;
    return (
      givenAnswer.toString().replace('.', ',').trim() ===
      exercise.correctAnswer.trim()
    );
  }

  checkFractionAnswer(
    givenAnswerFraction: { numerator: number; denominator: number },
    correctAnswerFraction: { numerator: number; denominator: number }
  ): boolean {
    if (
      givenAnswerFraction.denominator === correctAnswerFraction.denominator &&
      givenAnswerFraction.numerator === correctAnswerFraction.numerator
    ) {
      return true;
    }
    if (
      givenAnswerFraction.denominator ===
        -1 * correctAnswerFraction.denominator &&
      givenAnswerFraction.numerator === -1 * correctAnswerFraction.numerator &&
      (correctAnswerFraction.denominator < 0 ||
        correctAnswerFraction.numerator < 0)
    ) {
      return true;
    }
    return false;
  }
}
