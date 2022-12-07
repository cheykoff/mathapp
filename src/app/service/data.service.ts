import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import {
  AngularFirestore,
  validateEventsArray,
} from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { getDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { Observable, map, of, take, tap, first, switchMap, pipe } from 'rxjs';

import { Student } from '../shared/student';
import { Exercise } from '../shared/exercise';
import { Quiz } from '../shared/quiz';
import { Quiz2 } from '../shared/quiz2';
import { QuizTemplate } from '../shared/quiz-template';
import { convertSnaps, convertSnap } from './db-utils';
import { SchoolClass2 } from '../shared/schoolClass';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private _store: AngularFirestore,
    private _shared: SharedService
  ) {}

  // called from login

  retrieveStudentDataFromFirestore(studentId: number): void {
    console.log('retrieveStudentDataFromFirestore');
    console.log(studentId);
    this._store
      .doc(`students/${this._shared.getStudentDocumentId()}`)
      .get()
      .pipe(map((result) => convertSnap<Student>(result)))
      .subscribe((data: Student) => {
        this._shared.setStudentData(data);
      });
  }

  getStudentDocumentIds() {
    console.log('getStudentDocumentIds');
    console.log(this._shared.getStudentId());
    return this._store
      .collection('students', (ref) =>
        // ref.where('studentId', '==', this._shared.getStudentId())
        ref.where('studentId', '==', this._shared.getStudentId())
      )
      .get()
      .pipe(map((result) => convertSnaps<Student>(result)))
      .subscribe((data: Student[]) => {
        console.log(data[0].id); // TODO: Get only one document
        this._shared.setStudentDocumentId(data[0].id);
        this._shared.setSchoolClassDocumentId(data[0].schoolClasses[0].classId);
      });
  }

  getQuizTemplateIDs() {
    console.log('getQuizTemplateIDs');
    return this._store
      .doc(`schoolClasses/${this._shared.getSchoolClassDocumentId()}`)
      .get()
      .pipe(map((result) => convertSnap<SchoolClass2>(result)))
      .subscribe((data: SchoolClass2) => {
        this._shared.setQuizTemplateIds(data.quizTemplateIds);
      });
  }

  /*
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
  */

  /*
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
  */
  /*
  storeMode(mode: string): void {
    this._store.doc(`/sessions/${this._shared.getSessionId()}`).update({
      mode: mode,
    });
  }
  */

  storeSchoolClass(className: number) {
    this._store
      .collection(`quizzes`)
      .add({
        schoolClass: className,
        // sessionId: this._shared.getSessionId(),
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

  // called from quiz-intro
  storeQuizStart() {
    this._store
      .collection(`students/${this._shared.getStudentDocumentId()}/quizzes`)
      .add({
        quizTemplateId: 'TY1wRNj2Bq71aCvGgf0v',
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

  // called from resultpage
  storeQuizEnd() {
    const quizEndTime = new Date();
    this._store
      .doc(
        `/students/${this._shared.getStudentDocumentId()}/quizzes/${this._shared.getQuizId()}`
      )
      .update({
        correctAnswers: this._shared.correctAnswer,
        totalQuestions:
          this._shared.correctAnswer + this._shared.incorrectAnswer,
        duration: quizEndTime.getTime() - this._shared.getQuizStartTime(),
      });
  }

  // called from exercise
  storeAnswer(
    exerciseId: string,
    answerIsCorrect: boolean,
    duration: number,
    attempts: number,
    startTime: Date,
    endTime: Date
  ) {
    console.log('studentId: ' + this._shared.getStudentId());
    // console.log('sessionId: ' + this._shared.getSessionId());
    console.log('quizId: ' + this._shared.getQuizId());
    console.log('exerciseId: ' + exerciseId);
    console.log('startTime: ' + startTime);
    console.log('endTime: ' + endTime);
    console.log('serverTimestamp: ' + serverTimestamp());
    console.log('answerIsCorrect: ' + answerIsCorrect);
    console.log('duration: ' + duration);
    console.log('attempts: ' + attempts);
    this._store
      .collection(
        `students/${
          this._shared.studentDocumentId
        }/quizzes/${this._shared.getQuizId()}/answers`
      )
      .add({
        startTime: startTime,
        exerciseId: exerciseId,
        attempt: attempts,
        answerIsCorrect: answerIsCorrect,
        duration: duration,
      });
  }

  /*
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
  */

  // called from exercise
  // TODO: Refactor
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
        quizId: this._shared.getQuizId(),
      });
  }

  /*
  addEndTime() {
    this._store.doc(`/sessions/${this._shared.getSessionId()}`).update({
      endTime: serverTimestamp(),
    });
  }
  */

  // called from resultpage
  // TODO: Decide if I want to keep it
  storeSelfReflection(selfReflection: number) {
    this._store.doc(`/quizzes/${this._shared.getQuizId()}`).update({
      selfReflection: selfReflection,
    });
  }

  /*
  getAllExercises(): Observable<Exercise[]> {
    return this._store
      .collection('exercises-all')
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }
  */

  /*
  getQuizzes(): Observable<Quiz[]> {
    return this._store
      .collection(
        'users/G2vP9ZCoZNEDwnr4JsgG/sessions/3zDdvscA1GkZDzkmr0Ji/quizzes'
      )
      .get()
      .pipe(map((result) => convertSnaps<Quiz>(result)));
  }
  */

  /*
  getQuizzes3(): Observable<Quiz[]> {
    return this._store
      .collection('quizzes3')
      .get()
      .pipe(map((result) => convertSnaps<Quiz>(result)));
  }
  */

  // called from Quiz Page
  getQuizzes4(): Observable<Quiz[]> {
    console.log('getQuizzes4');
    return this._store
      .collection(`students/${this._shared.getStudentDocumentId()}/quizzes`)
      .get()
      .pipe(map((result) => convertSnaps<Quiz>(result)));
  }

  getQuizTemplates(): Observable<QuizTemplate[]> {
    console.log('getQuizTemplates');
    return this._store
      .collection(`quizTemplates`)
      .get()
      .pipe(map((result) => convertSnaps<QuizTemplate>(result)));
  }

  getQuizTemplates2(): Observable<SchoolClass2> {
    console.log('getQuizTemplates2');
    return this._store
      .doc(`schoolClasses/qurzXjuNZYu48TS03O2g`)
      .get()
      .pipe(map((result) => convertSnap<SchoolClass2>(result)));
  }

  getSchoolClassId(): void {
    console.log('getSchoolClassId');
    console.log(this._shared.getStudentDocumentId());
    this._store
      // .doc('students/' + this._shared.getStudentDocumentId())
      .doc('students/BbWzvQmUIMpytT5G5bUI')
      .get()
      .pipe(map((result) => convertSnap<Student>(result)))
      .pipe(tap(console.log))
      .pipe(
        tap((student) => {
          console.log(student);
          this._shared.schoolClassDocumentId = student.schoolClasses[0].classId;
        })
      );
  }

  /*
  getSchoolClassByStudentId(): Observable<SchoolClass2> {
    const studentDocumentId = 'BbWzvQmUIMpytT5G5bUI';
    const schoolClassId = 'qurzXjuNZYu48TS03O2g';
    return this._store.doc(`students/${studentDocumentId}`)
    .get()
    .pipe(map((result) => convertSnap<Student>(result)))
    .pipe(switchMap((student: Student): SchoolClass2 => {
      this._store.doc(`schoolClasses/${student.schoolClass}`)
      .get()
      .pipe(map((result) => convertSnap<SchoolClass2>(result)))
  }))
   }
  */

  /*
    return this._store
      .doc(`schoolClasses/${schoolClassId}`)
      .get()
      .pipe(map((result) => convertSnap<SchoolClass2>(result)));
      */

  /* 
  getQuizTemplates3(): void {
    console.log('getQuizTemplate3');
    const switched = of(1, 2, 3).pipe(switchMap((x) => of(x, x ** 2, x ** 3)));
    switched.subscribe((x) => console.log(x));

    let schoolClassId: any;

    const mySchoolClasses$ = this._store
      .collection(`students`, (ref) => ref.where('studentId', '==', 123456))
      .get()
      .pipe(map((result) => convertSnaps<Student>(result)))
      .pipe(
        switchMap((result) => {
          schoolClassId = this._store
            .doc(`schoolClasses/${result[0].schoolClassId}`)
            .get()
            .pipe(map((result) => convertSnaps<SchoolClass2>(result)));
        })
      );
    mySchoolClasses$.subscribe((result) => console.log(result));
    */

  /*
    return this._store
      .collection(`schoolClasses`, (ref) =>
        ref.where(
          'studentIds',
          'array-contains',
          this._shared.getStudentDocumentId()
        )
      )
      .get()
      .pipe(
        switchMap((schoolClasses) => this.getQuizTemplates4(schoolClasses))
      );
      
  }
  */

  // called from quiz-intro
  getExercisesByQuizId2(): void {
    console.log('getExercisesByQuizId2');
    /*
    return this._store
      .doc(`quizTemplates/TY1wRNj2Bq71aCvGgf0v`)
      .get()
      .pipe(map((result) => convertSnap<Quiz2>(result)));
      */
  }

  // called from exercise
  // TODO: Can I call it from quiz-intro?
  getExercisesByQuizTemplateId() {
    console.log('getExercisesByQuizTemplateId');
    return this._store
      .collection(`exerciseTemplates`)
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }

  /*
  storeAccessTime() {
    // Updating the document with the id wkPUpYoqmSgPYyv5ngor in the collection quizzes3.
    this._store.doc(`quizzes3/wkPUpYoqmSgPYyv5ngor`).update({
      accessTime: serverTimestamp(),
    });
    this._store.doc(`/quizzes3/99EqMuYQDPfbgYXemyDQ`).update({
      accessTime: serverTimestamp(),
    });
  }
  */

  // called from quiz-intro
  // TODO: use dynamic document id
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
