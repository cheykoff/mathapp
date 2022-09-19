import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css'],
})
export class ResultpageComponent implements OnInit {
  percentage: number = 0;

  constructor(
    public shared: SharedService,
    private _dataService: DataService
  ) {}

  getPercentage(): number {
    return (
      (this.shared.correctAnswer /
        (this.shared.correctAnswer + this.shared.incorrectAnswer)) *
      100
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
    this._dataService.storeResult();
  }
}
