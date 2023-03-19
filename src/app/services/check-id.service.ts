import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map } from 'rxjs';
import { Student } from '../models/student';
import { convertSnaps } from '../../utils/db-utils';

@Injectable({
  providedIn: 'root',
})
export class CheckIdService {
  constructor(private _store: AngularFirestore) {}

  async checkIdIsUnique(id: number): Promise<boolean> {
    let idExistsInDb: boolean;
    const querySnapshot = await this._store
      .collection('students', (ref) => ref.where('studentId', '==', id))
      .get()
      .toPromise();

    const data: Student[] = querySnapshot.docs.map(
      (doc) => doc.data() as Student
    );
    if (data.length > 0) {
      idExistsInDb = true;
    } else {
      idExistsInDb = false;
    }
    return !idExistsInDb;
  }
}
