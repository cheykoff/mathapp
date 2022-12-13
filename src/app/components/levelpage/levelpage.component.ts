import { Component, OnInit } from '@angular/core';
import { Level, levels } from './levels';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-levelpage',
  templateUrl: './levelpage.component.html',
  styleUrls: ['./levelpage.component.scss'],
})
export class LevelpageComponent implements OnInit {
  levels: Level[] = levels;

  constructor(private _router: Router, public shared: SharedService) {}

  ngOnInit(): void {
    console.log(this.shared.levelStars);
    console.log(this.shared.topic);
    console.log(this.levels);
    if (
      this.shared.levelStars === undefined ||
      this.shared.levelStars === null
    ) {
      console.log('levelStars is undefined or null - initializing');
      this.shared.initializeLevelStars();
    }
    console.log('setCurrentLevels');
    this.shared.setCurrentLevels();
  }

  goToDynamicExercise(level: Level): void {
    this.shared.chosenLevel = level.level;
    const quizStartDate = new Date();
    this.shared.setQuizStartTime(quizStartDate);
    this._router.navigate(['/', 'exercise']);
  }
}
