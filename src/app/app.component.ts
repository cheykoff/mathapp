import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private _dataService: DataService,
    private _shared: SharedService
  ) {}

  ngOnInit(): void {
    this._shared.setSessionId();
    this._shared.setParameters();
    this._dataService.storeSessionId();
  }
}
