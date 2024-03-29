import { Component, OnInit } from '@angular/core';
import { Level, levels } from './levels';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-levelpage',
  templateUrl: './levelpage.component.html',
  styleUrls: ['./levelpage.component.scss'],
})
export class LevelpageComponent implements OnInit {
  levels: Level[] = levels;

  constructor(private _router: Router, public shared: SharedService) {}

  ngOnInit(): void {
    if (
      this.shared.studentData.levelStars === undefined ||
      this.shared.studentData.levelStars === null
    ) {
      this.shared.initializeLevelStars();
    }

    this.shared.setCurrentLevels();
  }

  goToDynamicExercise(level: Level): void {
    this.shared.chosenLevel = level.level;
    const quizStartDate = new Date();
    this.shared.setQuizStartTime(quizStartDate);
    this._router.navigate(['/', 'exercise']);
  }
}
