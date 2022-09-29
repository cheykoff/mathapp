import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Puzzle } from '../shared/puzzle';
import { DataService } from '../service/data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private _router: Router, private _dataService: DataService) {}

  ngOnInit(): void {
    this.puzzles$ = this._dataService.getAllPuzzles(5);
  }

  onClickAnswer(form: NgForm, puzzles: Puzzle[]): void {
    const value = form.value;
    console.log(this.currentQuestion);
    this.attempts++;
    if (
      value.givenAnswer.toString() ===
      puzzles[this.currentQuestion].correctAnswer
    ) {
      this.endTime = new Date();
      this.duration = this.endTime.getTime() - this.startTime.getTime();
      this.startTime = new Date();
      if (this.currentQuestion >= puzzles.length - 1) {
        this.showResult();
        return;
      }
      this.storePuzzleAnswer();
      this.currentQuestion++;

      return;
    }
    return;
  }

  storePuzzleAnswer(): void {
    this._dataService.storePuzzleAnswer(this.duration, this.attempts);
    this.attempts = 0;
  }

  showResult(): void {
    console.log('done');
    this._router.navigate(['/', 'resultpage']);
  }
}
