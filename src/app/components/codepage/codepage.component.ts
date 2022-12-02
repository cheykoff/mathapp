import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-codepage',
  templateUrl: './codepage.component.html',
  styleUrls: ['./codepage.component.scss'],
})
export class CodepageComponent implements OnInit {
  constructor(private _router: Router, private _shared: SharedService) {}

  ngOnInit(): void {}
  wrongCode: boolean = false;
  wrongCodeCounter: number = 0;
  studentId = this._shared.getStudentId();

  submitCode(form: NgForm): void {
    const value = form.value;
    if (value.code === 'Tiger') {
      this.goToLevelPage();
    } else {
      this.wrongCode = true;
      this.wrongCodeCounter++;
    }
  }

  goToExercise(): void {
    this._router.navigate(['/', 'exercise']);
    this._shared.countDownTimer();
  }
  goToLevelPage(): void {
    this._router.navigate(['/', 'levelpage']);
    this._shared.countDownTimer();
  }
}
