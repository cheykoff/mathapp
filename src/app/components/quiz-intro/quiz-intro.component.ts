import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-intro',
  templateUrl: './quiz-intro.component.html',
  styleUrls: ['./quiz-intro.component.css'],
})
export class QuizIntroComponent implements OnInit {
  header = 'DieMatheApp - Quiz';
  totalExercises = 10;
  quizTimeLimit = 1800;
  constructor() {}

  ngOnInit(): void {}
}
