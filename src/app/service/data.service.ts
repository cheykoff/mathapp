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
        endTime: endTime,
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
}
