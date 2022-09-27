import { Component, OnInit, Input } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';

import { QuestionService } from '../service/question.service';
import { SharedService } from '../shared/shared.service';
import { Exercise } from '../shared/exercise';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  exercisesClass5$: Observable<Exercise[]>;

  public currentQuestion: number = 0;
  public givenAnswers: any = [];

  public exercises: Exercise[] = [];

  constructor(
    private _questionService: QuestionService,
    private _shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this.exercisesClass5$ = this._dataService.getAllExercises(5);
    this.exercisesClass5$.subscribe((results) => {
      results.forEach((result) => {
        this.exercises.push(result);
      });
    });
  }

  onClickAnswer(option: any, i: number): void {
    this.checkAnswer(option, i);
    this.storeAnswer();
    this.currentQuestion++;
    if (this.currentQuestion >= this.exercises.length) {
      this.showResult();
    }
  }

  checkAnswer(option: any, i: number): void {
    if (option === this.exercises[0].correctAnswer) {
      this._shared.points += 1;
      this._shared.correctAnswer++;
    } else {
      this._shared.incorrectAnswer++;
    }
  }

  storeAnswer(): void {
    // to do
  }

  compare(a: any, b: any): number {
    if (parseInt(a.text) < parseInt(b.text)) {
      return -1;
    }
    if (parseInt(a.text) > parseInt(b.text)) {
      return 1;
    }
    if (a.text < b.text) {
      return -1;
    }
    if (a.text > b.text) {
      return 1;
    }
    return 0;
  }

  contains(arr, value): number {
    if (arr && value) {
      let i = arr.length;
      while (i--) {
        if (arr[i].text === value) {
          return i;
        }
      }
    }
    return -1;
  }

  sortAnswerOptions(arr: any): void {
    const indexOfNoAnswer = this.contains(arr, 'Keine Antwort ist richtig');
    if (!arr) {
      return undefined;
    }
    if (indexOfNoAnswer >= 0) {
      const temp = arr[indexOfNoAnswer];
      arr[indexOfNoAnswer] = arr[arr.length - 1];
      arr[arr.length - 1] = temp;

      const arr2 = arr.slice(0, -1).sort(this.compare);
      arr2.push(arr[arr.length - 1]);
      arr = arr2;
    } else {
      arr.sort(this.compare);
    }
    return arr;
  }

  showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }
}
