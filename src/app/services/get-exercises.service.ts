import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable, map, tap } from 'rxjs';

import { Exercise } from '../components/exercise/exercise';
import { convertSnaps } from '../../utils/db-utils';

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
      .collection('exercises-multiplication', (ref) =>
        ref
          .where('difficulty', '<', 20)
          .orderBy('difficulty')
          .orderBy('version')
      )
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }
}
