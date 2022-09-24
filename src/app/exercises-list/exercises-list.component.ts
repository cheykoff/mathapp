import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../shared/exercise';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css'],
})
export class ExercisesListComponent implements OnInit {
  @Input() exercises: Exercise[];
  @Input() exercise: Exercise;
  constructor() {}

  ngOnInit(): void {}
}
