import { Component, OnInit, HostListener } from '@angular/core';
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
    this._shared.setSessionId(this._shared.sessionId);
    this._shared.setParameters();
    this._dataService.storeSessionId();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    localStorage.setItem('studentId', this._shared.getStudentId().toString());
    localStorage.setItem(
      'schoolClass',
      this._shared.getSchoolClass().toString()
    );
    localStorage.setItem('sessionId', this._shared.getSessionId());
  }

  @HostListener('window:load', ['$event'])
  loadHandler(event: Event) {
    this._shared.setStudentId(parseInt(localStorage.getItem('studentId')));
    this._shared.setSchoolClass(parseInt(localStorage.getItem('schoolClass')));
    this._shared.setSessionId(localStorage.getItem('sessionId'));
  }
}
