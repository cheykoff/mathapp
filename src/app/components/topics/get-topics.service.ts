import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable, map } from 'rxjs';

import { convertSnaps } from '../../../utils/db-utils';
import { Topic } from './topics';

@Injectable({
  providedIn: 'root',
})
export class GetTopicsService {
  constructor(private _store: AngularFirestore) {}

  getTopics(): Observable<Topic[]> {
    return this._store
      .collection('topics', (ref) => ref.orderBy('orderNumber', 'asc'))
      .get()
      .pipe(map((result) => convertSnaps<Topic>(result)));
  }
}
