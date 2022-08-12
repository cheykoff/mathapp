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
  ngOnInit(): void {
    this.getParameters();
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
