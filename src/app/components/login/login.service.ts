import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';

import { Observable, map, take, first } from 'rxjs';

import { Student } from '../../shared/student';
import { convertSnaps, convertSnap } from '../../service/db-utils';

@Injectable({
  providedIn: 'root',
})
export class LoginValidation {
  constructor(private _store: AngularFirestore) {}

  studentId = 123457;

  validateStudentId(): void {
    console.log('validateStudentId() called');
    const students2 = [];
    this._store
      .collection(`students`, (ref) =>
        ref.where('studentId', '==', this.studentId)
      )
      .get()
      .pipe(map((result) => convertSnaps<Student>(result)))
      .subscribe((students) => {
        console.log('all students');
        students.forEach((student) => {
          console.log(student);
          students2.push(student);
        });
        if (students2.length > 0) {
          console.log('studentId found');
          return;
        }
        console.log('studentId not found');
        return;
      });
  }
}
