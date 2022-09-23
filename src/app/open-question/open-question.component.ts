import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as e from 'cors';

@Component({
  selector: 'app-open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.css'],
})
export class OpenQuestionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Answer: ');
    console.log('Unit: ');
  }
}
