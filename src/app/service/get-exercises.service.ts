import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable, map, tap } from 'rxjs';

import { Exercise } from '../shared/exercise';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class GetExercisesService {
  constructor(
    private _store: AngularFirestore,
    private _shared: SharedService
  ) {}

  getExercises(): Observable<Exercise[]> {
    return this._store
      .collection('exercises', (ref) =>
        ref
          .where('classLevel', '==', this._shared.getSchoolClass())
          .where('chapter', '==', this._shared.getChapter())
      )
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)))
      .pipe(tap((result) => console.log(result)));
  }
}
