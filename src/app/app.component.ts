import { Component } from '@angular/core';
import { DataService } from './service/data.service';

interface Exercise {
  question: string;
  answers: number[];
  correctAnswer: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private dataService: DataService) {}

  title = 'quizappv1';
  parameters = {};
  userId = '';
  ngOnInit(): void {
    this.getParameters();
    this.setSessionId();
  }

  sessionId = 'sessionl_' + Math.random().toString(36).substr(2, 9);
  setSessionId() {
    this.dataService.storeSessionId(this.sessionId);
  }

  getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split('?')[1];
    if (paramString) {
      this.parameters = paramString.split('&');
    }
    this.dataService.storeUrlParameters(this.parameters);
  }
}
