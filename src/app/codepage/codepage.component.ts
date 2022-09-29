import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-codepage',
  templateUrl: './codepage.component.html',
  styleUrls: ['./codepage.component.css'],
})
export class CodepageComponent implements OnInit {
  constructor(private _router: Router, private _dataService: DataService) {}

  ngOnInit(): void {}
  wrongCode: boolean = false;
  wrongCodeCounter: number = 0;

  submitCode(form: NgForm): void {
    const value = form.value;
    if (value.code === 300922) {
      this._dataService.storeQuizId();
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
