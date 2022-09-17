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
    console.log('ngOnInit of classselection');
    this._store.collection(`session`).add({
      test: 'test',
    });

    /* update or add a  field in an document or (works)
    this._store.doc('/session.session3/3O1NG3TjXCyCwN8HUB7S').update({
      class: 7,
    });
    this._store.doc('/session.session3/3O1NG3TjXCyCwN8HUB7S').update({
      class2: 7,
    });
    */
    /*
    this._store.collection('session').add({
      session: this.sessionId,
      startTime: Date.now(),
    });
    */
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
