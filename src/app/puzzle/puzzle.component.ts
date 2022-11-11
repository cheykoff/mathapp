import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Puzzle } from '../shared/puzzle';
import { DataService } from '../service/data.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css'],
})
export class PuzzleComponent implements OnInit {
  puzzles$: Observable<Puzzle[]>;

  currentQuestion: number = 0;
  attempts: number = 0;

  startTime: Date = new Date();
  endTime: Date;
  duration: number;
  // firstTryDuration: number;
  // wrongAnswers: any[];

  isIncorrectAnswer: boolean = false;
  isCorrectAnswer: boolean = false;

  givenAnswer: string = '';

  constructor(
    private _router: Router,
    private _dataService: DataService,
    public shared: SharedService
  ) {}

  ngOnInit(): void {
    this.puzzles$ = this._dataService.getAllPuzzles(5);
  }

  onClickAnswer(form: NgForm, puzzles: Puzzle[]): void {
    const value = form.value;
    this.attempts++;
    if (
      parseInt(value.givenAnswer.toString().trim()) ===
      parseInt(puzzles[this.currentQuestion].correctAnswer)
    ) {
      if (this.attempts === 1) {
        this.shared.correctPuzzles++;
        /*this.firstTryDuration =
          this.endTime.getTime() - this.startTime.getTime();
          */
      }
      this.endTime = new Date();
      this.duration = this.endTime.getTime() - this.startTime.getTime();
      this.startTime = new Date();
      this.storePuzzleAnswer(puzzles[this.currentQuestion]);
      if (this.currentQuestion >= puzzles.length - 1) {
        this.showResult();
        return;
      }
      this.isCorrectAnswer = true;
      this.currentQuestion++;
      setTimeout(() => {
        this.givenAnswer = '';
        this.isCorrectAnswer = false;
      }, 1000);

      return;
    }
    if (this.attempts === 1) {
      this.shared.incorrectPuzzles++;
      // this.firstTryDuration = this.endTime.getTime() - this.startTime.getTime();
    }

    this.isIncorrectAnswer = true;
    // this.wrongAnswers.push(parseInt(value.givenAnswer.toString().trim()));
    setTimeout(() => {
      this.isIncorrectAnswer = false;
    }, 2000);
    return;
  }

  storePuzzleAnswer({ id }: Puzzle): void {
    this._dataService.storePuzzleAnswer(
      id,
      this.duration,
      // this.firstTryDuration,
      this.attempts
      // this.wrongAnswers
    );
    this.attempts = 0;
  }

  showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }
}
