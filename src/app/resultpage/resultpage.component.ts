import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css'],
})
export class ResultpageComponent implements OnInit {
  // TODO: Should I initialize these variables in the constructor?
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  points: number = 0;
  percentage: number = 0;
  constructor(
    private shared: SharedService,
    private dataService: DataService
  ) {}

  getPercentage(): number {
    return (
      (this.correctAnswer / (this.correctAnswer + this.incorrectAnswer)) * 100
    );
  }

  getStars(): string {
    const stars = Math.floor(this.getPercentage() / 20);
    let imgUrl = 'assets/img/' + stars + 'stars.gif';
    if (!stars) {
      imgUrl = 'assets/img/' + 0 + 'stars.gif';
    }
    return imgUrl;
  }

  ngOnInit(): void {
    this.points = this.shared.getPoints();
    this.correctAnswer = this.shared.getCorrectAnswer();
    this.incorrectAnswer = this.shared.getIncorrectAnswer();
    this.storeResult();
  }

  storeResult() {
    this.dataService.storeResult(this.points);
  }
}
