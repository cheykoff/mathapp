import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

import { DataService } from '../../../service/data.service';
import { SharedService } from '../../../shared/shared.service';
import { Exercise } from '../../../shared/exercise';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  exercises$: Observable<Exercise[]>;

  exercises: Exercise[] = [];

  srcs: string[] = [];

  currentQuestion: number = 0;
  attempts: number = 0;

  startTime: Date = new Date();
  endTime: Date;
  duration: number;

  constructor(
    private _dataService: DataService,
    public shared: SharedService
  ) {}

  ngOnInit(): void {
    this.exercises$ = this._dataService.getExercises();
    this.exercises$.subscribe((data: Exercise[]) => {
      this.shared.totalSessionQuestions = Math.min(
        this.shared.totalSessionQuestions,
        data.length
      );
      for (let exercise of data) {
        this.exercises.push(exercise);
        this.srcs.push('assets/img/geometry/' + exercise.img + '.jpg');
      }
    });
  }

  @Output() onSubmit = new EventEmitter<NgForm>();

  submit(form: NgForm, exercise: Exercise) {
    this.onSubmit.emit();
  }

  @Input() answerIsIncorrect: boolean = false;

  onFocusEvent(event: any) {
    this.answerIsIncorrect = false;
  }
}
