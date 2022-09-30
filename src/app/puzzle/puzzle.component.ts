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

  isIncorrectAnswer: boolean = false;
  isCorrectAnswer: boolean = false;

  givenAnswer: string = '';

  constructor(private _router: Router, private _dataService: DataService) {}

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
    this.isIncorrectAnswer = true;
    setTimeout(() => {
      this.isIncorrectAnswer = false;
    }, 2000);
    return;
  }

  storePuzzleAnswer({ id }: Puzzle): void {
    this._dataService.storePuzzleAnswer(id, this.duration, this.attempts);
    this.attempts = 0;
  }

  showResult(): void {
    this._router.navigate(['/', 'puzzleresultpage']);
  }
}
