import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import {
  AngularFirestore,
  validateEventsArray,
} from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { getDoc, serverTimestamp } from 'firebase/firestore';
import { Observable, map, take, first } from 'rxjs';

import { Exercise } from '../shared/exercise';
import { Quiz } from '../shared/quiz';
import { Quiz2 } from '../shared/quiz2';
import { convertSnaps, convertSnap } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private _store: AngularFirestore,
    private _shared: SharedService
  ) {}

  writeIntoDB() {
    console.log('writeIntoDB');
    this._store.collection(`test`).add({
      name: 'test',
      startTime: serverTimestamp(),
    });
  }

  readFromDB() {
    console.log('readFromDB');
    console.log(
      this._store
        .collection('test')
        .get()
        .pipe(map((result) => convertSnaps<Quiz>(result)))
    );
    /*
    this._store
      .collection(`test`)
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      });
      */
  }

  storeSessionId() {
    this._store
      .collection(`sessions`)
      .add({
        url: window.location.href,
        startTime: serverTimestamp(),
        studentId: this._shared.getStudentId(),
      })
      .then((docRef) => {
        this._shared.setSessionId(docRef.id);
      })
      .then(() => {
        localStorage.setItem('sessionId', this._shared.getSessionId());
        localStorage.setItem(
          'studentId',
          this._shared.getStudentId().toString()
        );
      });
  }

  updateStudentId() {
    this._store
      .doc(`/sessions/${this._shared.getSessionId()}`)
      .update({
        studentId: this._shared.studentId,
      })
      .then(() => {
        localStorage.setItem(
          'studentId',
          this._shared.getStudentId().toString()
        );
      });
  }

  storeMode(mode: string): void {
    this._store.doc(`/sessions/${this._shared.getSessionId()}`).update({
      mode: mode,
    });
  }

  storeSchoolClass(className: number) {
    this._store
      .collection(`quizzes`)
      .add({
        schoolClass: className,
        sessionId: this._shared.getSessionId(),
        url: window.location.href,
        startTime: serverTimestamp(),
        studentId: this._shared.getStudentId(),
      })
      .then((docRef) => {
        this._shared.setQuizId(docRef.id);
      });
    localStorage.setItem(
      'schoolClass',
      this._shared.getSchoolClass().toString()
    );
  }

  storeAnswer(
    exerciseId: string,
    answerIsCorrect: boolean,
    duration: number,
    attempts: number
  ) {
    this._store.collection(`quizzes/${this._shared.getQuizId()}/answers`).add({
      startTime: serverTimestamp(),
      exerciseId: exerciseId,
      answerIsCorrect: answerIsCorrect,
      duration: duration,
      studentId: this._shared.getStudentId(),
      sessionId: this._shared.getSessionId(),
      quizId: this._shared.getQuizId(),
    });
  }

  storePuzzleAnswer(
    puzzleId: string,
    duration: number,
    // firstTryDuration: number,
    attempts: number
    // wrongAnswers: any[]
  ) {
    this._store
      .collection(`quizzes/${this._shared.getQuizId()}/puzzleanswers`)
      .add({
        startTime: serverTimestamp(),
        attempts: attempts,
        duration: duration,
        // firstTryDuration: firstTryDuration,
        puzzleId: puzzleId,
        studentId: this._shared.getStudentId(),
        sessionId: this._shared.getSessionId(),
        quizId: this._shared.getQuizId(),
        // wrongAnswers: wrongAnswers,
      });
  }

  storeResult() {
    this._store.doc(`/quizzes/${this._shared.getQuizId()}`).update({
      correctAnswers: this._shared.correctAnswer,
      totalQuestions: this._shared.correctAnswer + this._shared.incorrectAnswer,
      correctPuzzles: this._shared.correctPuzzles,
      totalPuzzles: this._shared.correctPuzzles + this._shared.incorrectPuzzles,
      endTime: serverTimestamp(),
    });
  }

  storeDynamicAnswer(
    question: string,
    correctAnswer: number,
    givenAnswer: number,
    answerIsCorrect: boolean,
    duration: number,
    level: number
  ) {
    this._store
      .collection(`quizzes/${this._shared.getQuizId()}/dynamicanswers`)
      .add({
        startTime: serverTimestamp(),
        question: question,
        correctAnswer: correctAnswer,
        givenAnswer: givenAnswer,
        answerIsCorrect: answerIsCorrect,
        duration: duration,
        level: level,
        studentId: this._shared.getStudentId(),
        sessionId: this._shared.getSessionId(),
        quizId: this._shared.getQuizId(),
      });
  }

  addEndTime() {
    this._store.doc(`/sessions/${this._shared.getSessionId()}`).update({
      endTime: serverTimestamp(),
    });
  }

  storeSelfReflection(selfReflection: number) {
    this._store.doc(`/quizzes/${this._shared.getQuizId()}`).update({
      selfReflection: selfReflection,
    });
  }

  getAllExercises(): Observable<Exercise[]> {
    return this._store
      .collection('exercises-all')
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }

  getQuizzes(): Observable<Quiz[]> {
    return this._store
      .collection(
        'users/G2vP9ZCoZNEDwnr4JsgG/sessions/3zDdvscA1GkZDzkmr0Ji/quizzes'
      )
      .get()
      .pipe(map((result) => convertSnaps<Quiz>(result)));
  }

  getExercisesByQuizId(): Observable<Quiz2> {
    return (
      this._store
        .doc('quizzes2/3ebk6z4nj8wGCKqPiPZp')
        .get()
        //.pipe(map(results => results.docs ))
        .pipe(map((result) => convertSnap<Quiz2>(result)))
    ); // does not work
    //.valueChanges() as Observable<Quiz2> // does work
  }
}
