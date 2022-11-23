import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { DataService } from '../../service/data.service';

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
    console.log('submitTrainingSetup');
    const value = form.controls['quiz-duration'].value;
    console.log(value);
  }
}
