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

  getQuizTemplateIDs() {
    return this._store
      .doc(`schoolClasses/${this._shared.getSchoolClassDocumentId()}`)
      .get()
      .pipe(map((result) => convertSnap<SchoolClass2>(result)))
      .subscribe((data: SchoolClass2) => {
        this._shared.setQuizTemplateIds(data.quizTemplateIds);
      });
  }

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

  storeSchoolClassName(schoolClassName: string) {
    console.log('storeSchoolClassName: ' + schoolClassName);
    this._store.doc(`students/${this._shared.getStudentDocumentId()}`).update({
      schoolClassName: schoolClassName,
    });
    localStorage.setItem('schoolClassName', schoolClassName);
  }

  // called from quiz-intro
  storeQuizStart() {
    this._store
      .collection(`students/${this._shared.getStudentDocumentId()}/quizzes`)
      .add({
        quizTemplateId: 'TY1wRNj2Bq71aCvGgf0v',
        url: window.location.href,
        startTime: serverTimestamp(),
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

  storePracticeStart() {
    this._store
      .collection(`students/${this._shared.getStudentDocumentId()}/practices`)
      .add({
        level: this._shared.chosenLevel,
        startTime: serverTimestamp(),
        url: window.location.href,
        topic: this._shared.topic,
      })
      .then((docRef) => {
        this._shared.setPracticeId(docRef.id);
      });
  }

  storeLevelEnd() {
    const quizEndTime = new Date();
    this._store
      .doc(
        `/students/${this._shared.getStudentDocumentId()}/practices/${this._shared.getPracticeId()}`
      )
      .update({
        // TODO: change to update
        correctAnswers: this._shared.correctAnswer,
        totalQuestions:
          this._shared.correctAnswer + this._shared.incorrectAnswer,
        duration: quizEndTime.getTime() - this._shared.getQuizStartTime(),
      });
  }

  storeLevelStars() {
    this._store.doc(`/students/${this._shared.getStudentDocumentId()}`).update({
      levelStars: this._shared.levelStars,
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
    this._store
      .collection(
        `students/${this._shared.getStudentDocumentId()}/quizzes/${this._shared.getQuizId()}/answers`
      )
      .add({
        startTime: startTime,
        exerciseId: exerciseId,
        attempt: attempts,
        answerIsCorrect: answerIsCorrect,
        duration: duration,
      });
  }

  // called from exercise
  // TODO: Refactor
  storeDynamicAnswer(
    question: string,
    correctAnswer: number,
    givenAnswer: number,
    answerIsCorrect: boolean,
    duration: number,
    level: number,
    attempt: number
  ) {
    this._store
      .collection(
        `students/${
          this._shared.studentData.id
        }/practices/${this._shared.getPracticeId()}/practiceanswers`
      )
      .add({
        startTime: serverTimestamp(),
        question: question,
        correctAnswer: correctAnswer,
        givenAnswer: givenAnswer,
        answerIsCorrect: answerIsCorrect,
        duration: duration,
        level: level,
        attempt: attempt,
        topic: this._shared.topic,
      });
  }

  // called from resultpage
  // TODO: Decide if I want to keep it
  storeSelfReflection(selfReflection: number) {
    this._store.doc(`/quizzes/${this._shared.getQuizId()}`).update({
      selfReflection: selfReflection,
    });
  }

  // called from Quiz Page
  getQuizzes4(): Observable<Quiz[]> {
    return this._store
      .collection(`students/${this._shared.getStudentDocumentId()}/quizzes`)
      .get()
      .pipe(map((result) => convertSnaps<Quiz>(result)));
  }

  getQuizTemplates(): Observable<QuizTemplate[]> {
    return this._store
      .collection(`quizTemplates`)
      .get()
      .pipe(map((result) => convertSnaps<QuizTemplate>(result)));
  }

  getQuizTemplates2(): Observable<SchoolClass2> {
    return this._store
      .doc(`schoolClasses/qurzXjuNZYu48TS03O2g`)
      .get()
      .pipe(map((result) => convertSnap<SchoolClass2>(result)));
  }

  getSchoolClassId(): void {
    this._store
      .doc('students/BbWzvQmUIMpytT5G5bUI')
      .get()
      .pipe(map((result) => convertSnap<Student>(result)));
  }

  // called from exercise
  // TODO: Can I call it from quiz-intro?
  getExercisesByQuizTemplateId() {
    return this._store
      .collection(`exerciseTemplates`)
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }

  // called from quiz-intro
  // TODO: use dynamic document id
  getExercisesByQuizId(): Observable<Quiz2> {
    return this._store
      .doc('quizzes2/3ebk6z4nj8wGCKqPiPZp')
      .get()
      .pipe(map((result) => convertSnap<Quiz2>(result)));
  }
  /*
  getExercisesGisela6b221213() {
    return this._store
      .collection('exercises-gisela-6b-221213')
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)))
      
  }
  */

  getExercisesGisela6a221213(): Observable<Exercise[]> {
    return (
      this._store
        // .collection('exercises-gisela-6b221213')
        .collection('exercises-gisela-6a-221213')
        .get()
        .pipe(map((result) => convertSnaps<Exercise>(result)))
        .pipe(tap((result) => console.log(result)))
    );
  }

  getExercisesGisela5b221213(): Observable<Exercise[]> {
    return (
      this._store
        // .collection('exercises-gisela-6b221213')
        .collection('exercises-gisela-5b')
        .get()
        .pipe(map((result) => convertSnaps<Exercise>(result)))
        .pipe(tap((result) => console.log(result)))
    );
  }

  getExercises() {
    return this._store
      .collection('exercises')
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)))
      .pipe(tap((result) => console.log(result)));
  }

  getExercises6() {
    return this._store
      .collection('exercises6')
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)))
      .pipe(tap((result) => console.log(result)));
  }
}
