import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Exercise } from '../exercise';
import { ExerciseComponent } from '../exercise.component';

/*
create interface structures
interface Data {
  isCorrect: boolean;
}
*/

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
  @Output() submitAnswer = new EventEmitter<boolean>();

  // injects parent component to child (access to all methods)
  constructor(private appExercise: ExerciseComponent) {}

  onSubmitAnswer(form: NgForm, exercise: Exercise) {
    this.submitAnswer.emit(true);
  }
  // normally better use input and out variables (but here injection is better)
  // use injection when the parent has some shared variables
  // e.g. reset method in parent component
  // maybe reset

  /*
  what does it receive (one exercise)
  what does it emit (boolean
    
  create interface structures
   */
  /*
  someMethod() {
    this.appExercise.someMethod();
  }
  */
}
