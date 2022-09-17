import { Component } from '@angular/core';
import { DataService } from './service/data.service';
import { SharedService } from './shared/shared.service';

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
  constructor(
    private dataService: DataService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    this.shared.setSessionId();
    this.shared.setParameters();
    this.dataService.storeSessionId();
  }
}
