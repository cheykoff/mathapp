import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { DataService } from '../service/data.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-classselection',
  templateUrl: './classselection.component.html',
  styleUrls: ['./classselection.component.css'],
})
export class ClassselectionComponent implements OnInit {
  schoolClass: number = 0;

  constructor(
    private _shared: SharedService,
    private _router: Router,
    private _store: AngularFirestore,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {}

  selectSchoolClass(className: number): void {
    this.schoolClass = className;
    this._dataService.storeSchoolClass(className);
    this._shared.setSchoolClass(className);
    this.goToExercise();
  }

  goToExercise() {
    this._router.navigate(['/', 'exercise']);
  }
}
