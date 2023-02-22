import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-training-setup',
  templateUrl: './training-setup.component.html',
  styleUrls: ['./training-setup.component.scss'],
})
export class TrainingSetupComponent implements OnInit {
  header = 'Übungsaufgaben';
  constructor() {}

  ngOnInit(): void {}

  submitTrainingSetup(form: NgForm) {
    const value = form.controls['quiz-duration'].value;
  }
}
