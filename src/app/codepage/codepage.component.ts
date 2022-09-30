import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../service/data.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-codepage',
  templateUrl: './codepage.component.html',
  styleUrls: ['./codepage.component.css'],
})
export class CodepageComponent implements OnInit {
  constructor(
    private _router: Router,
    private _dataService: DataService,
    private _shared: SharedService
  ) {}

  ngOnInit(): void {}
  wrongCode: boolean = false;
  wrongCodeCounter: number = 0;
  studentId = this._shared.getStudentId();

  submitCode(form: NgForm): void {
    const value = form.value;
    if (value.code === 300922) {
      this.goToExercise();
    } else {
      this.wrongCode = true;
      this.wrongCodeCounter++;
    }
  }

  goToExercise(): void {
    this._router.navigate(['/', 'exercise']);
  }
}
