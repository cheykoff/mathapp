import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from '../service/question.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  // TODO: Should I initialize these variables in the constructor?
  public questionList: any = [];
  public currentQuestion: number = 0;
  quizCompleted: boolean = false;
  public givenAnswers: any = [];
  isAnswered: boolean = false;

  constructor(
    private _questionService: QuestionService,
    private _shared: SharedService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (this._shared.getSchoolClass()) {
      this.getAllQuestions(this._shared.getSchoolClass());
    } else {
      this._router.navigate(['/', 'startpage']);
    }
  }

  getAllQuestions(schoolClass: number) {
    this._questionService.getQuestionJson(schoolClass).subscribe((data) => {
      this.questionList = data.questions.filter((question: any) => {
        return question.schoolClass === this._shared.getSchoolClass() - 1;
      });
    });
  }

  answer(option: any) {
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

  compare(a, b) {
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

  contains(arr, value) {
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

  sortAnswerOptions(arr) {
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

  nextQuestion() {
    this.currentQuestion++;
    this.isAnswered = false;
    this.questionList[this.currentQuestion].options = this.sortAnswerOptions(
      this.questionList[this.currentQuestion].options
    );
    if (this.currentQuestion >= this.questionList.length - 1) {
      this.quizCompleted = true;
    }
  }

  showResult() {
    this._router.navigate(['/', 'resultpage']);
  }
}
