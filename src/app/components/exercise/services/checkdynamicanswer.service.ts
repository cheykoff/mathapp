import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CheckDynamicAnswerService {
  constructor() {}

  checkDynamicAnswer(form: NgForm, answer: number): boolean {
    const givenAnswer = form.value.givenAnswer;
    // refactor to: return givenAnswer === answer;
    if (givenAnswer === answer) {
      return true;
    } else {
      return false;
    }
  }
}
