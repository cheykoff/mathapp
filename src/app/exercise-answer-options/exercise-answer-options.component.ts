import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../shared/exercise';

@Component({
  selector: 'app-exercise-answer-options',
  templateUrl: './exercise-answer-options.component.html',
  styleUrls: ['./exercise-answer-options.component.css'],
})
export class ExerciseAnswerOptionsComponent implements OnInit {
  @Input() exercises: Exercise[];
  constructor() {}

  ngOnInit(): void {}
}
