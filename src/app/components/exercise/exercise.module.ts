import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MathjaxModule } from 'mathjax-angular';
import { CountDownPipe } from 'src/app/countdown.pipe';

import { ExerciseComponent } from './exercise.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [ExerciseComponent, CountDownPipe, QuestionComponent],
  imports: [RouterModule, CommonModule, FormsModule, MathjaxModule],
  exports: [ExerciseComponent],
})
export class ExerciseModule {}
