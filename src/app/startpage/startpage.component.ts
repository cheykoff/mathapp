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

  setMode(mode: string): void {
    this._dataService.storeMode(mode); // TODO: Pass value to service
  }

  getExercise(): void {
    this.exercisesClass5$ = this._dataService.getAllExercises(5);
  }
}
