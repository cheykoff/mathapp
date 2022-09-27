import { Component, OnInit, Input } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
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
  // @Input() exercise: Exercise;

  exercisesClass5$: Observable<Exercise[]>;

  // TODO: Check type of questionlist and if we need it at all?
  public questionList: any = [];
  public currentQuestion: number = 1;
  quizCompleted: boolean = false;
  public givenAnswers: any = [];
  isAnswered: boolean = false;

  public exercises: Exercise[] = [
    {
      id: 'teistae',
      classLevel: 5,
      question: 'Wie viele Zähne hat ein Erwachsener?',
      answers: [5, 10, 32, 232],
      correctAnswer: 32,
      orderNumber: 1,
    },
    {
      id: 'teistiejae',
      classLevel: 5,
      question: 'Wie viele Beine hat ein Erwachsener?',
      answers: [2, 10, 12, 232],
      correctAnswer: 2,
      orderNumber: 2,
    },
  ];
  public exercise = this.exercises[this.currentQuestion - 1];
  /*
  public exercise: Exercise = {
    id: 'teistae',
    classLevel: 5,
    question: 'Wie viele Zähne hat ein Erwachsener?',
    answers: [5, 10, 12, 232],
    correctAnswer: 10,
    orderNumber: 1,
  };

  public exercise2: Exercise = {
    id: 'teistae',
    classLevel: 5,
    question: 'Wie viele Beine hat ein Erwachsener?',
    answers: [2, 10, 12, 232],
    correctAnswer: 2,
    orderNumber: 2,
  };
  */
  // exercise.question = 'test';

  constructor(
    private _questionService: QuestionService,
    private _shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit() in exercise.component.ts');

    // this.getNextQuestion();
    /*
    if (this._shared.getSchoolClass()) {
      this.getAllQuestions(this._shared.getSchoolClass());
    } else {
      this._router.navigate(['/', 'startpage']);
    }
    this.exercisesClass5$ = this._dataService.getExercise(
      5,
      this.currentQuestion
    );
    */
    // console.log(typeof this.exercises);
    // this.getAllExercises();
  }
  /*
  getAllQuestions(schoolClass: number): void {
    this._questionService.getQuestionJson(schoolClass).subscribe((data) => {
      this.questionList = data.questions.filter((question: any) => {
        return question.schoolClass === this._shared.getSchoolClass() - 1;
      });
    });
  }
  */

  onClickAnswer(option: any, i: number): void {
    console.log('CLICKED');
    console.log('currentQuestion: ' + this.currentQuestion);
    this.checkAnswer(option, i);
    this.storeAnswer();
    this.currentQuestion++;
    if (this.currentQuestion < this.exercises.length + 1) {
      this.getNextQuestion();
    } else {
      this.showResult();
    }
  }

  checkAnswer(option: any, i: number): void {
    console.log('checkAnswer() in exercise.component.ts');
    console.log('option ' + i + 'selected: ' + option);
    if (option === this.exercises[0].correctAnswer) {
      console.log('correct answer');
      // this.points += 1;
      this._shared.points += 1;
      this._shared.correctAnswer++;
    } else {
      console.log('incorrect answer');
      this._shared.incorrectAnswer++;
    }
    this.isAnswered = true;

    // this.shared.setPoints(this.points);
    /*
    if (this.currentQuestion < this.questionList.length - 1) {
      this.nextQuestion();
    } else {
      this.showResult();
    }
    */
  }

  storeAnswer(): void {
    console.log('storeAnswer() in exercise.component.ts');
  }

  getNextQuestion(): void {
    console.log('getNextQuestion() in exercise.component.ts');
    //this.getExercise();
    this.nextQuestion();
  }

  showNextQuestion(): void {}

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
    this.isAnswered = false;
    this.exercise = this.exercises[this.currentQuestion - 1];
    /*
    this.questionList[this.currentQuestion].options = this.sortAnswerOptions(
      this.questionList[this.currentQuestion].options
    );
    if (this.currentQuestion >= this.questionList.length - 1) {
      this.quizCompleted = true;
    }
    // this.getExercise();
    */
  }
  /*
  getExercise(): void {
    console.log(
      'getExercise() in exercise.component.ts, exerciseClass5$: ' +
        this.exercisesClass5$ +
        ' currentQuestion: ' +
        this.currentQuestion
    );
    this.exercisesClass5$ = this._dataService.getExercise(
      5,
      this.currentQuestion
    );
    console.log(this.exercisesClass5$.subscribe((data) => console.log(data)));
    console.log(
      this.exercisesClass5$.subscribe((data) => console.log(data))
    )[0];
  }
  */
  /*
  getAllExercises(): void {
    console.log(
      'getExercise() in exercise.component.ts, exerciseClass5$: ' +
        this.exercisesClass5$ +
        ' currentQuestion: ' +
        this.currentQuestion
    );
    this.exercisesClass5$ = this._dataService.getAllExercises(5);
    console.log(this.exercisesClass5$.subscribe((data) => console.log(data)));
    /*console.log(
      this.exercisesClass5$.subscribe((data) => console.log(data))
    )[0];
    
    this.exercises = this.exercisesClass5$.subscribe();
    console.log(this.exercises);
  }
  */

  showResult(): void {
    this.quizCompleted = true;
    this._router.navigate(['/', 'resultpage']);
  }
}
