import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { serverTimestamp, increment } from 'firebase/firestore';
import { Observable, map, tap } from 'rxjs';

import { Exercise } from '../shared/exercise';
import { Chapter } from '../components/chapterselection/chapters';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private _store: AngularFirestore,
    private _shared: SharedService
  ) {}

  storeSchoolClass(schoolClass: number) {
    this._store.doc(`students/${this._shared.getStudentDocumentId()}`).update({
      schoolClass: schoolClass,
      url: window.location.href,
      startTime: serverTimestamp(),
      studentId: this._shared.getStudentId(),
    });
    localStorage.setItem(
      'schoolClass',
      this._shared.getSchoolClass().toString()
    );
  }

  storeChapter(chapter: Chapter) {
    this._store.doc(`students/${this._shared.getStudentDocumentId()}`).update({
      chapter: chapter,
    });
    localStorage.setItem('chapter', this._shared.getChapter().toString());
  }

  storeSchoolClassName(schoolClassName: string) {
    this._store.doc(`students/${this._shared.getStudentDocumentId()}`).update({
      schoolClassName: schoolClassName,
    });
    localStorage.setItem('schoolClassName', schoolClassName);
  }
}
