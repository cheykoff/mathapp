import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Exercise } from 'src/app/shared/exercise';
import { SharedService } from 'src/app/shared/shared.service';

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

  checkFractionAnswer(form: NgForm, exercise?: Exercise): boolean {
    const correctDenominator = exercise.correctAnswerFraction.denominator;
    const correctNumerator = exercise.correctAnswerFraction.numerator;
    const givenDenominator = form.value.denominator;
    const givenNumerator = form.value.numerator;

    if (
      (parseInt(givenDenominator) === parseInt(correctDenominator) &&
        parseInt(givenNumerator) === parseInt(correctNumerator)) ||
      (parseInt(givenDenominator) === -1 * parseInt(correctDenominator) &&
        parseInt(givenNumerator) === -1 * parseInt(correctNumerator))
    ) {
      return true;
    } else {
      return false;
    }
  }
}
