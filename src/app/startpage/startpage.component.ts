import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css'],
})
export class StartpageComponent implements OnInit {
  constructor(private _dataService: DataService) {}

  ngOnInit(): void {}

  setMode(): void {
    this._dataService.storeMode(); // TODO: Pass value to service
  }

  getExercise(): void {
    console.log('getExercise() called');
    console.log(this._dataService.getExercise(5)); // pass classLevel
  }
}
