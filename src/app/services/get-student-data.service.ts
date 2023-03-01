import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { map } from 'rxjs';

import { Student } from '../models/student';
import { convertSnaps } from '../../utils/db-utils';

@Injectable({
  providedIn: 'root',
})
export class GetStudentDataService {
  constructor(
    private _store: AngularFirestore,
    private _shared: SharedService
  ) {}

  getStudentDocument(studentId: number) {
    this._store
      .collection('students', (ref) => ref.where('studentId', '==', studentId))
      .get()
      .pipe(map((result) => convertSnaps<Student>(result)))
      .subscribe((data: Student[]) => {
        if (data.length > 0) {
          this._shared.setStudentData(data[0]);
        } else {
          this._store
            .collection('students')
            .add({
              studentId: studentId,
              levelStars: {
                Addition: [0, 0, 0],
                Subtraktion: [0, 0, 0],
                Multiplikation: [0, 0, 0],
                Division: [0, 0, 0],
                Terme: [0, 0, 0],
              },
              totalPracticeQuestions: 0,
              correctPracticeQuestions: 0,
              classId: null,
            })
            .then((docRef) => {
              this._shared.setStudentDocumentId(docRef.id);
            });
        }
      });
  }
}
