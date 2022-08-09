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
  public questionList: any = [];
  public currentQuestion: number = 0;
  correctAnswer: number = 0;
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
    this.getAllQuestions(this.shared.getSchoolClass());
    console.log('exercise component: ngOnInit');
    console.log(
      'exercise component: schoolClass: ' + this.shared.getSchoolClass()
    );
    console.log('ngOnInit questions: ' + this.questionList);
  }

  getAllQuestions(schoolClass: number) {
    this.questionService.getQuestionJson(schoolClass).subscribe((data) => {
      this.questionList = data.questions.filter((question: any) => {
        return question.schoolClass === this.shared.getSchoolClass();
      });
    });
    console.log('getAllQuestions questions: ' + this.questionList);
  }

  answer(currentQno: number, option: any) {
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

  // Richard Durstenfeld's version of the Fisher-Yates shuffle algorithm
  randomizeOrderOfOptions() {
    let arr = this.questionList[this.currentQuestion].options;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.questionList[this.currentQuestion].options = arr;
  }

  nextQuestion() {
    this.currentQuestion++;
    this.isAnswered = false;
    this.randomizeOrderOfOptions();
    console.log('nextQuestion questions: ' + this.questionList[0].questionText);
    if (this.currentQuestion >= this.questionList.length - 1) {
      this.quizCompleted = true;
    }
  }

  showResult() {
    this.router.navigate(['/', 'resultpage']);
  }
}
