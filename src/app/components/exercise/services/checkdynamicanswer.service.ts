import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CheckDynamicAnswerService {
  constructor() {}

  checkDynamicAnswer(form: NgForm, answer: number): boolean {
    return form.value.givenAnswer === answer;
  }
}
