import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css'],
})
export class ResultpageComponent implements OnInit {
  constructor(
    public shared: SharedService,
    private _dataService: DataService
  ) {}

  percentage: number = 0;

  getPercentage(): void {
    this.percentage =
      (this.shared.correctAnswer /
        (this.shared.correctAnswer + this.shared.incorrectAnswer)) *
      100;
  }

  getStars(): string {
    this.getPercentage();
    const stars = Math.floor(this.percentage / 20);
    let imgUrl = 'assets/img/' + stars + 'stars.gif';
    if (!stars) {
      imgUrl = 'assets/img/' + 0 + 'stars.gif';
    }
    return imgUrl;
  }

  ngOnInit(): void {
    this._dataService.storeResult();
  }

  repeatQuiz(): void {
    this.shared.correctAnswer = 0;
    this.shared.incorrectAnswer = 0;
    this._dataService.storeSchoolClass(this.shared.getSchoolClass());
  }
}
