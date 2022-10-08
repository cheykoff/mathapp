import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dynamicexercise',
  templateUrl: './dynamicexercise.component.html',
  styleUrls: ['./dynamicexercise.component.css'],
})
export class DynamicexerciseComponent implements OnInit {
  constructor() {}
  question: string;
  correctAnswer: number;
  currentQuestion: number = 0;
  countCorrectAnswers = 0;
  givenAnswer: string;
  level: number = 1;
  placeholder: string = '';
  value: string = '';
  operators: string[] = ['+', '-', '*', '/'];

  createExercise(operator: string): void {
    let a;
    let b;
    if (this.level <= 5) {
      a = this.generateRandomInt(1, 10);
      b = this.generateRandomInt(1, 10);
    } else if (this.level <= 10) {
      a = this.generateRandomInt(11, 20);
      b = this.generateRandomInt(11, 20);
    } else if (this.level <= 15) {
      a = this.generateRandomInt(21, 50);
      b = this.generateRandomInt(21, 50);
    } else if (this.level <= 20) {
      a = this.generateRandomInt(51, 100);
      b = this.generateRandomInt(51, 100);
    }

    this.question = a + operator + b;
    if (operator === '+') {
      this.correctAnswer = a + b;
    } else if (operator === '-') {
      this.correctAnswer = a - b;
    } else if (operator === '*') {
      this.correctAnswer = a * b;
    } else if (operator === '/') {
      this.correctAnswer = a / b;
    }
    console.log(this.correctAnswer);
  }

  generateRandomInt(minValue: number, maxValue: number): number {
    let randInt;
    do {
      randInt =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    } while (randInt === 0);
    console.log(randInt);
    return randInt;
  }

  onClickAnswer(form: NgForm): void {
    this.checkAnswer(form.value.givenAnswer);
    this.currentQuestion++;
    this.createExercise('+');
    this.clearInput();
  }

  clearInput(): void {
    this.givenAnswer = '';
  }

  checkAnswer(givenAnswer: string): void {
    if (parseInt(givenAnswer.toString().trim()) === this.correctAnswer) {
      this.countCorrectAnswers++;
      this.level++;
      console.log('Correct answer');
    } else {
      console.log('Incorrect answer');
      if (this.level > 1) {
        this.level--;
      }
    }
  }

  ngOnInit(): void {
    this.createExercise('+');
  }
}
