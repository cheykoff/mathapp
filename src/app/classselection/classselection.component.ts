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
    private shared: SharedService,
    private router: Router,
    private _store: AngularFirestore,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this._store.collection(`session`).add({
      test: 'test',
    });
  }

  selectSchoolClass(className: number): void {
    this.schoolClass = className;
    this.dataService.storeSchoolClass(className);
    this.shared.setSchoolClass(className);
    this.goToExercise();
  }

  goToExercise() {
    this.router.navigate(['/', 'exercise']);
  }
}
