import { Topic } from '../topics/topics';
import { createTerm } from './create-term';
import { createCalculationRule } from './create-calculation-rule';
import { getRandInteger } from './exercise-util';

export function createExercise(
  level: number,
  topic: string
): { question: string; answer: number; startTime: Date } {
  console.log('createExercise');
  if (topic === 'Terme') {
    const { question, answer, startTime } = createTerm(level);
    return { question: question, answer: answer, startTime: startTime };
  }
  if (topic === 'Rechenregeln') {
    const { question, answer, startTime } = createCalculationRule(level);
    return { question: question, answer: answer, startTime: startTime };
  }
  const startTime = new Date();
  console.log(startTime);
  let minNum = 0;
  let maxNum = 0;
  if (level === 1) {
    if (topic === 'Addition' || topic === 'Subtraktion') {
      minNum = 1;
      maxNum = 10;
    }
    minNum = 1;
    maxNum = 5;
  } else if (level === 2) {
    if (topic === 'Addition' || topic === 'Subtraktion') {
      minNum = 1;
      maxNum = 20;
    } else {
      minNum = 1;
      maxNum = 10;
    }
  } else if (level === 3) {
    if (topic === 'Addition' || topic === 'Subtraktion') {
      minNum = 1;
      maxNum = 100;
    } else {
      minNum = 1;
      maxNum = 20;
    }
  } else if (level === 4) {
    if (topic === 'Addition' || topic === 'Subtraktion') {
      minNum = 1;
      maxNum = 1000;
    } else {
      minNum = 1;
      maxNum = 100;
    }
  } else if (level === 5) {
    if (topic === 'Addition' || topic === 'Subtraktion') {
      minNum = 1;
      maxNum = 10000;
    } else {
      minNum = 1;
      maxNum = 1000;
    }
  } else {
    if (topic === 'Addition' || topic === 'Subtraktion') {
      minNum = 1;
      maxNum = 100000;
    } else {
      minNum = 1;
      maxNum = 10000;
    }
  }
  let a = getRandInteger(minNum, maxNum);
  let b = getRandInteger(minNum, maxNum);
  let question: string;
  let answer: number;
  if (topic === 'Addition') {
    question = `${a} + ${b} = ?`;
    answer = a + b;
  } else if (topic === 'Subtraktion') {
    if (a > b) {
      question = `${a} - ${b} = ?`;
      answer = a - b;
    } else {
      question = `${b} - ${a} = ?`;
      answer = b - a;
    }
  } else if (topic === 'Multiplikation') {
    question = `${a} ⋅ ${b} = ?`;
    answer = a * b;
  } else if (topic === 'Division') {
    const c = a * b;
    question = `${c} : ${a} = ?`;
    answer = b;
  }
  console.log(question);
  console.log(answer);
  return { question: question, answer: answer, startTime: startTime };
}
