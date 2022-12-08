import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { DataService } from '../../service/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.scss'],
})
export class ResultpageComponent implements OnInit {
  constructor(
    public shared: SharedService,
    private _dataService: DataService
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
    this.stars = Math.max(5 - this.shared.incorrectAnswer, 0); // TODO: Use this.shared.currentLevelStars
    let imgUrl = 'assets/img/' + this.stars + 'stars.gif';
    if (!this.stars) {
      imgUrl = 'assets/img/' + 0 + 'stars.gif';
    }
    return imgUrl;
  }

  ngOnInit(): void {
    this.getStars();
    console.log('correctAnswer: ' + this.shared.correctAnswer);
    console.log('incorrectAnswer: ' + this.shared.incorrectAnswer);
    if (this.shared.mode === 'quiz') {
      this._dataService.storeQuizEnd();
    } else if (this.shared.mode === 'practice') {
      // this.shared.updateLevelStars(this.stars);
      this._dataService.storeLevelEnd();
      this._dataService.storeLevelStars();
    }
  }

  onSubmitSelfReflection(form: NgForm): void {
    this._dataService.storeSelfReflection(form.value.selfReflection);
    this.selfReflectionGiven = true;
  }

  repeatQuiz(): void {
    this.shared.correctAnswer = 0;
    this.shared.incorrectAnswer = 0;
    this._dataService.storeSchoolClass(this.shared.getSchoolClass());
  }
}
