import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { QuestionService } from '../service/question.service';
import { SharedService } from '../shared/shared.service';
import { Exercise } from '../shared/exercise';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  @Input() exercises: Exercise[];

  exercisesClass5$: Observable<Exercise[]>;

  // TODO: Check type of questionlist and if we need it at all?
  public questionList: any = [];
  public currentQuestion: number = 0;
  quizCompleted: boolean = false;
  public givenAnswers: any = [];
  isAnswered: boolean = false;

  constructor(
    private _questionService: QuestionService,
    private _shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    if (this._shared.getSchoolClass()) {
      this.getAllQuestions(this._shared.getSchoolClass());
    } else {
      this._router.navigate(['/', 'startpage']);
    }
  }

  getAllQuestions(schoolClass: number): void {
    this._questionService.getQuestionJson(schoolClass).subscribe((data) => {
      this.questionList = data.questions.filter((question: any) => {
        return question.schoolClass === this._shared.getSchoolClass() - 1;
      });
    });
    console.log(this.questionList);
    console.log(typeof this.questionList);
  }

  answer(option: any): void {
    if (option.correct) {
      // this.points += 1;
      this._shared.points += 1;
      this._shared.correctAnswer++;
    } else {
      this._shared.incorrectAnswer++;
    }
    this.isAnswered = true;

    // this.shared.setPoints(this.points);

    if (this.currentQuestion < this.questionList.length - 1) {
      this.nextQuestion();
    } else {
      this.showResult();
    }
    console.log('correct: ' + this._shared.correctAnswer);
    console.log('incorrect: ' + this._shared.incorrectAnswer);
  }

  compare(a: any, b: any): number {
    if (parseInt(a.text) < parseInt(b.text)) {
      return -1;
    }
    if (parseInt(a.text) > parseInt(b.text)) {
      return 1;
    }
    if (a.text < b.text) {
      return -1;
    }
    if (a.text > b.text) {
      return 1;
    }
    return 0;
  }

  contains(arr, value): number {
    if (arr && value) {
      let i = arr.length;
      while (i--) {
        if (arr[i].text === value) {
          return i;
        }
      }
    }
    return -1;
  }

  sortAnswerOptions(arr: any): void {
    const indexOfNoAnswer = this.contains(arr, 'Keine Antwort ist richtig');
    if (!arr) {
      return undefined;
    }
    if (indexOfNoAnswer >= 0) {
      const temp = arr[indexOfNoAnswer];
      arr[indexOfNoAnswer] = arr[arr.length - 1];
      arr[arr.length - 1] = temp;

      const arr2 = arr.slice(0, -1).sort(this.compare);
      arr2.push(arr[arr.length - 1]);
      arr = arr2;
    } else {
      arr.sort(this.compare);
    }
    return arr;
  }

  nextQuestion(): void {
    this.currentQuestion++;
    this.isAnswered = false;
    this.questionList[this.currentQuestion].options = this.sortAnswerOptions(
      this.questionList[this.currentQuestion].options
    );
    if (this.currentQuestion >= this.questionList.length - 1) {
      this.quizCompleted = true;
    }
    this.getExercise();
  }

  getExercise(): void {
    console.log('getExercise() called');
    console.log(this._dataService.getExercise(5)); // pass classLevel
    this.exercisesClass5$ = this._dataService.getExercise(5);
    console.log(this.exercisesClass5$);
  }

  showResult(): void {
    this._router.navigate(['/', 'resultpage']);
  }
}
