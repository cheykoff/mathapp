import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../shared/exercise';
import { DataService } from '../service/data.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-exercise-answer-options',
  templateUrl: './exercise-answer-options.component.html',
  styleUrls: ['./exercise-answer-options.component.css'],
})
export class ExerciseAnswerOptionsComponent implements OnInit {
  @Input() exercises: Exercise[];

  isAnswered: boolean = false;
  public currentQuestion: number = 0;

  constructor(
    private _shared: SharedService,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {}

  answer2(option: any): void {
    console.log('answer2');
    console.log(option);
    this.nextQuestion();
    return;
  }
  answer(option: any): void {
    console.log('answer', option);
    if (option.correct) {
      // this.points += 1;
      this._shared.points += 1;
      this._shared.correctAnswer++;
    } else {
      this._shared.incorrectAnswer++;
    }
    this.isAnswered = true;

    // this.shared.setPoints(this.points);
    this.nextQuestion();
    /*
    if (this.currentQuestion < this.questionList.length - 1) {
      this.nextQuestion();
    } else {
      this.showResult();
    }
     */
  }

  nextQuestion(): void {
    console.log(
      'nextQuestion() in exercise-answer-option.ts' + this.currentQuestion
    );
    this.currentQuestion++;
    this.isAnswered = false;

    this._dataService.getExercise(5, this.currentQuestion + 1);
  }
}
