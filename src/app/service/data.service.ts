import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { serverTimestamp, increment } from 'firebase/firestore';
import { Observable, map } from 'rxjs';

import { Student } from '../shared/student';
import { Exercise } from '../shared/exercise';
import { convertSnaps } from './db-utils';

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
    this._store.doc(`students/${this._shared.getStudentDocumentId()}`).update({
      schoolClassName: schoolClassName,
    });
    localStorage.setItem('schoolClassName', schoolClassName);
  }

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
        correctAnswers: this._shared.correctAnswer,
        totalQuestions:
          this._shared.correctAnswer + this._shared.incorrectAnswer,
        duration: quizEndTime.getTime() - this._shared.getQuizStartTime(),
      });
    this._store.doc(`/students/${this._shared.getStudentDocumentId()}`).update({
      totalPracticeQuestions: increment(
        this._shared.correctAnswer + this._shared.incorrectAnswer
      ),
      correctPracticeQuestions: increment(this._shared.correctAnswer),
    });
  }

  storelevelStars() {
    this._store.doc(`/students/${this._shared.getStudentDocumentId()}`).update({
      levelStars: this._shared.studentData.levelStars,
    });
  }

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
        studentId: this._shared.getStudentId(),
      });
  }

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

  getExercises(): Observable<Exercise[]> {
    return this._store
      .collection('exercise-test5', (ref) =>
        ref.where('classLevel', '==', 5).where('chapter', '==', 5)
      )
      .get()
      .pipe(map((result) => convertSnaps<Exercise>(result)));
  }
}
