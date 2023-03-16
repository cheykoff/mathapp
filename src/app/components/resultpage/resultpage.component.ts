import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';
import { StoreQuizService } from '../../services/store-quiz.service';
import { StorePracticeService } from '../../services/store-practice.service';

@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.scss'],
})
export class ResultpageComponent implements OnInit {
  constructor(
    public shared: SharedService,
    private _dataService: DataService,
    private _storeQuizService: StoreQuizService,
    private _storePracticeService: StorePracticeService
  ) {}

  stars: number;

  percentage: number = 0;
  selfReflection: number;
  selfReflectionGiven: boolean = false;

  getPercentage(): void {
    this.percentage =
      (this.shared.correctAnswer /
        (this.shared.correctAnswer + this.shared.incorrectAnswer)) *
      100;
  }

  getStars(): string {
    this.getPercentage();
    if (this.shared.mode === 'quiz') {
      this.stars = Math.floor(this.percentage / 20);
    } else {
      this.stars = Math.max(5 - this.shared.incorrectAnswer, 0);
    }
    let imgUrl = 'assets/img/' + this.stars + 'stars.gif';
    if (!this.stars) {
      imgUrl = 'assets/img/' + 0 + 'stars.gif';
    }
    return imgUrl;
  }

  ngOnInit(): void {
    this.getStars();
    if (this.shared.mode === 'quiz') {
      this._storeQuizService.storeQuizEnd();
      this.shared.stopCountDownTimer();
    } else if (this.shared.mode === 'practice') {
      this._storePracticeService.storeLevelEnd();
      this._storePracticeService.storelevelStars();
    }
  }

  repeatQuiz(): void {
    this.shared.correctAnswer = 0;
    this.shared.incorrectAnswer = 0;
    this._dataService.storeSchoolClass(this.shared.getSchoolClass());
  }
}
