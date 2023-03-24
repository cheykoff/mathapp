import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

import { Exercise } from '../components/exercise/exercise';

@Injectable({
  providedIn: 'root',
})
export class StoreQuizService {
  constructor(
    private _store: AngularFirestore,
    private _shared: SharedService
  ) {}

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

  storeAnswer(
    exerciseId: string,
    answerIsCorrect: boolean,
    duration: number,
    attempts: number,
    startTime: Date,
    endTime: Date,
    exercise: Exercise
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
        question: exercise.question,
        answer: exercise.correctAnswer,
        version: exercise.version,
        difficulty: exercise.difficulty,
        chapter: exercise.chapter,
        subChapter: exercise.subChapter,
        questionNumber: exercise.questionNumber,
      });
    this._store
      .collection(
        `testSchulaufgabenStudents/${this._shared.getStudentId()}/answers`
      )
      .add({
        startTime: startTime,
        endTime: endTime,
        exerciseId: exerciseId,
        attempt: attempts,
        answerIsCorrect: answerIsCorrect,
        duration: duration,
        studentId: this._shared.getStudentId(),
        question: exercise.question,
        answer: exercise.correctAnswer,
        version: exercise.version,
        difficulty: exercise.difficulty,
        chapter: exercise.chapter,
        subChapter: exercise.subChapter,
        questionNumber: exercise.questionNumber,
      });
    this._store
      .collection(
        `testSchulaufgabenChapters/${exercise.chapter}/subchapters/${exercise.subChapter}/questionNumbers/${exercise.questionNumber}/answers`
      )
      .add({
        startTime: startTime,
        endTime: endTime,
        exerciseId: exerciseId,
        attempt: attempts,
        answerIsCorrect: answerIsCorrect,
        duration: duration,
        studentId: this._shared.getStudentId(),
        question: exercise.question,
        answer: exercise.correctAnswer,
        version: exercise.version,
        difficulty: exercise.difficulty,
        chapter: exercise.chapter,
        subChapter: exercise.subChapter,
        questionNumber: exercise.questionNumber,
      });
    this._store
      .collection(
        `testSchulaufgabenExercises/${exercise.chapter}-${exercise.subChapter}-${exercise.questionNumber}/answers`
      )
      .add({
        startTime: startTime,
        endTime: endTime,
        exerciseId: exerciseId,
        attempt: attempts,
        answerIsCorrect: answerIsCorrect,
        duration: duration,
        studentId: this._shared.getStudentId(),
        question: exercise.question,
        answer: exercise.correctAnswer,
        version: exercise.version,
        difficulty: exercise.difficulty,
        chapter: exercise.chapter,
        subChapter: exercise.subChapter,
        questionNumber: exercise.questionNumber,
      });
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
}
