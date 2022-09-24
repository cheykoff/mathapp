import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../service/data.service';
import { Exercise } from '../shared/exercise';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css'],
})
export class StartpageComponent implements OnInit {
  exercisesClass5$: Observable<Exercise[]>;

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {}

  setMode(): void {
    this._dataService.storeMode(); // TODO: Pass value to service
  }

  getExercise(): void {
    console.log('getExercise() called');
    console.log(this._dataService.getExercise(5, 1)); // pass classLevel
    this.exercisesClass5$ = this._dataService.getExercise(5, 1);
    console.log(this.exercisesClass5$);
  }
}
