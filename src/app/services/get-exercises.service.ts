import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable, map, tap } from 'rxjs';

import { Exercise } from '../components/exercise/exercise';
import { convertSnaps } from '../../utils/db-utils';
import { getRandInteger } from '../components/exercise/exercise-util';

@Injectable({
  providedIn: 'root',
})
export class GetExercisesService {
  constructor(
    private _store: AngularFirestore,
    private _shared: SharedService
  ) {}

  getExercises(): Observable<Exercise[]> {
    if (this._shared.getChapter() === 99) {
      return this._store
        .collection('exercises', (ref) =>
          ref
            .where('classLevel', '==', this._shared.getSchoolClass())
            .orderBy('chapter', 'asc')
            .orderBy('difficulty', 'asc')
        )
        .get()
        .pipe(map((result) => convertSnaps<Exercise>(result)));
    }
    return this._store
      .collection('exercises', (ref) =>
        ref
          .where('classLevel', '==', this._shared.getSchoolClass())
          .where('chapter', '==', this._shared.getChapter())
          .orderBy('difficulty', 'asc')
      )
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }

  /*
    const version = 10 * getRandInteger(0, 9) + 1;

    return this._store
      .collection('exercises-fraction-3', (ref) =>
        ref
          .where('version', '>=', version)
          .where('version', '<', version + 10)
          .orderBy('version', 'asc')
          .orderBy('difficulty', 'asc')
      )
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }
  */
  /*
    return this._store
      .collection('exercises-parallelogram')
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }
  */
  /*
    return this._store
      .collection('exercises-dreieck', (ref) => ref.where('version', '==', 1))
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }
  */
}
