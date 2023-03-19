import { Component, OnInit, HostListener } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private _shared: SharedService) {}

  ngOnInit(): void {
    this._shared.reloadStudentData();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    localStorage.setItem('studentId', this._shared.getStudentId().toString());
    localStorage.setItem(
      'schoolClass',
      this._shared.getSchoolClass().toString()
    );
    localStorage.setItem('mode', this._shared.getMode());
    localStorage.setItem('chapter', this._shared.getChapter().toString());
    localStorage.setItem('topic', this._shared.getTopic());
    localStorage.setItem(
      'levelStars',
      JSON.stringify(this._shared.studentData.levelStars)
    );
    if (this._shared.counter > 0) {
      window.opener.location.reload();
    }
  }

  @HostListener('window:load', ['$event'])
  loadHandler(event: Event) {
    this._shared.setSchoolClass(parseInt(localStorage.getItem('schoolClass')));
    this._shared.setChapter(parseInt(localStorage.getItem('chapter')));
    this._shared.setMode(localStorage.getItem('mode'));
    this._shared.reloadStudentData();
    this._shared.mode = localStorage.getItem('mode');
    this._shared.topic = localStorage.getItem('topic');
    this._shared.studentData.levelStars = JSON.parse(
      localStorage.getItem('levelStars')
    );
  }
}
