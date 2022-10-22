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
    this._shared.setParameters();
    /*
    if (!localStorage.getItem('sessionId')) {
      this._dataService.storeSessionId();
    }*/

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
    this._dataService.addEndTime();
    if (this._shared.counter > 0) {
      window.opener.location.reload();
    }
  }

  @HostListener('window:load', ['$event'])
  loadHandler(event: Event) {
    // this._shared.setStudentId(parseInt(localStorage.getItem('studentId')));
    this._shared.setSchoolClass(parseInt(localStorage.getItem('schoolClass')));
    this._shared.setSessionId(localStorage.getItem('sessionId'));
  }
}
