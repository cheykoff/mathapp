import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/shared/exercise';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-writtenanswer',
  templateUrl: './writtenanswer.component.html',
  styleUrls: ['./writtenanswer.component.css'],
})
export class WrittenanswerComponent implements OnInit {
  @Input() exercises$: Observable<Exercise[]>;
  @Input() currentQuestion: number;
  @Input() givenAnswer: string;
  @Input() correctAnswer: string;

  attempts: number = 0;

  constructor() {}

  ngOnInit(): void {}

  onClickAnswer(form: NgForm): void {
    const value = form.value;
    this.attempts++;
    if (
      parseInt(value.givenAnswer.toString().trim()) ===
      parseInt(this.correctAnswer)
    ) {
      /*
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
      */

      return;
    }
  }
}
