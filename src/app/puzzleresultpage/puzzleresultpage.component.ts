import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-puzzleresultpage',
  templateUrl: './puzzleresultpage.component.html',
  styleUrls: ['./puzzleresultpage.component.css'],
})
export class PuzzleresultpageComponent implements OnInit {
  constructor(
    public shared: SharedService,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this._dataService.storeResult();
  }

  getPercentage(): number {
    return (
      (this.shared.correctPuzzles /
        (this.shared.correctPuzzles + this.shared.incorrectPuzzles)) *
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
}
