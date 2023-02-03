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
    console.log('levelpage ngOnInit()');
    console.log('levelStars before');
    console.log(this.shared.levelStars);

    if (
      this.shared.levelStars === undefined ||
      this.shared.levelStars === null
    ) {
      this.shared.initializeLevelStars();
    } /*else {
      this.shared.initializeLevelStarsPerTopic();
    }*/

    console.log('levelStars after');
    console.log(this.shared.levelStars);
    console.log('currentLevels before');
    this.shared.setCurrentLevels();
    console.log('currentLevels after');
  }

  goToDynamicExercise(level: Level): void {
    this.shared.chosenLevel = level.level;
    const quizStartDate = new Date();
    this.shared.setQuizStartTime(quizStartDate);
    this._router.navigate(['/', 'exercise']);
  }
}
