import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    private _store: AngularFirestore
  ) {}

  sessionId: string = 'session1';

  ngOnInit(): void {
    console.log('ngOnInit of classselection');
    this._store.collection('session').add({
      session: this.sessionId,
      startTime: Date.now(),
    });
  }

  selectSchoolClass(className: number): void {
    this.schoolClass = className;
    this.shared.setSchoolClass(className);
    this.goToExercise();
  }

  goToExercise() {
    this.router.navigate(['/', 'exercise']);
  }

  addItem() {
    console.log('add item');
    this._store.collection('test').add({ test: 'test' });
  }
}
