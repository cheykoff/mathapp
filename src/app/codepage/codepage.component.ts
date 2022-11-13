import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-codepage',
  templateUrl: './codepage.component.html',
  styleUrls: ['./codepage.component.css'],
})
export class CodepageComponent implements OnInit {
  constructor(private _router: Router, private _shared: SharedService) {}

  ngOnInit(): void {}
  wrongCode: boolean = false;
  wrongCodeCounter: number = 0;
  studentId = this._shared.getStudentId();

  submitCode(form: NgForm): void {
    const value = form.value;
    if (value.code === 'Gorilla') {
      this._shared.testNumber = 1;
      this.goToExercise();
    } else if (value.code === 'Elefant') {
      this._shared.testNumber = 2;
      this.goToExercise();
    } else if (value.code === 'Panda') {
      this._shared.testNumber = 3;
      this.goToExercise();
    } else {
      this.wrongCode = true;
      this.wrongCodeCounter++;
    }
  }

  goToExercise(): void {
    this._router.navigate(['/', 'exercise2']);
    this._shared.countDownTimer();
  }
}
