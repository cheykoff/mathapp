import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Exercise } from '../exercise';

@Component({
  selector: 'app-exercise-fraction',
  templateUrl: './exercise-fraction.component.html',
  styleUrls: ['./exercise-fraction.component.css'],
})
export class ExerciseFractionComponent {
  @Input() exercises: Exercise[] = [];
  @Input() currentQuestion: number;
  @Input() isDisabled: boolean;
  @Input() numerator: string;
  @Input() denominator: string;
  @Output() submitAnswer = new EventEmitter();

  onSubmitAnswer(form: NgForm, exercise: Exercise) {
    this.submitAnswer.emit({ form, exercise });
  }
}
