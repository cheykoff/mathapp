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
  /*
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    localStorage.setItem('quizId', this._shared.getQuizId());
    localStorage.setItem('sessionId', this._shared.getSessionId());
    localStorage.setItem(
      'correctAnswer',
      this._shared.getCorrectAnswer().toString()
    );
    localStorage.setItem(
      'incorrectAnswer',
      this._shared.getIncorrectAnswer().toString()
    );
    localStorage.setItem(
      'currentQuestion',
      this._shared.currentQuestion.toString()
    );
  }

  @HostListener('window:load', ['$event'])
  loadHandler(event: Event) {
    this._shared.setQuizId(localStorage.getItem('quizId'));
    this._shared.setSessionId(localStorage.getItem('sessionId'));
    this._shared.setCorrectAnswer(
      parseInt(localStorage.getItem('correctAnswer'))
    );
    this._shared.setIncorrectAnswer(
      parseInt(localStorage.getItem('incorrectAnswer'))
    );
    this._shared.currentQuestion = parseInt(
      localStorage.getItem('currentQuestion')
    );
  }
  */
}
