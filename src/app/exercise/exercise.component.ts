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
  correctAnswer: number = 0; // TODO: Move to service
  incorrectAnswer: number = 0;
  public points: number = 0;
  quizCompleted: boolean = false;
  public givenAnswers: any = [];
  isAnswered: boolean = false;

  constructor(
    private questionService: QuestionService,
    private shared: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.shared.getSchoolClass()) {
      this.getAllQuestions(this.shared.getSchoolClass());
    } else {
      this.router.navigate(['/', 'startpage']);
    }
  }

  getAllQuestions(schoolClass: number) {
    this.questionService.getQuestionJson(schoolClass).subscribe((data) => {
      this.questionList = data.questions.filter((question: any) => {
        return question.schoolClass === this.shared.getSchoolClass() - 1;
      });
    });
  }

  answer(option: any) {
    if (option.correct) {
      this.points += 1;
      this.correctAnswer++;
    } else {
      this.incorrectAnswer++;
    }
    this.isAnswered = true;

    this.shared.setPoints(this.points);
    this.shared.setCorrectAnswer(this.correctAnswer);
    this.shared.setIncorrectAnswer(this.incorrectAnswer);
    if (this.currentQuestion < this.questionList.length - 1) {
      this.nextQuestion();
    } else {
      this.showResult();
    }
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
    this.router.navigate(['/', 'resultpage']);
  }
}
