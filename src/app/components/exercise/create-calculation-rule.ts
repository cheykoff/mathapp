import { getRandInteger } from './exercise-util';

export function createCalculationRule(level: number): {
  question: string;
  answer: number;
  startTime: Date;
} {
  const startTime = new Date();
  let question: string;
  let answer: number;
  let minNum = 2;
  let maxNum = 9;

  if (level === 1) {
    minNum = 1;
    maxNum = 20;
    const aArray = [2, 5];
    const a = aArray[getRandInteger(0, aArray.length - 1)];
    const b = getRandInteger(minNum, maxNum);
    const c = 10 / a;
    question =
      'Nutze das Assoziativgesetz\n(a ⋅ b) ⋅ c = a ⋅ (b ⋅ c) = (a ⋅ c) ⋅ b\n';
    question += `${a} ⋅ ${b} ⋅ ${c} = ?`;
    answer = a * b * c;
  } else if (level === 2) {
    minNum = 1;
    maxNum = 9;
    const a = getRandInteger(minNum, maxNum);
    const b = getRandInteger(minNum, maxNum);
    const c = 10 - b;
    question =
      'Nutze das Distributivgesetz der Multiplikation \n(a ⋅ c) + (b ⋅ c) = (a + b) ⋅ c\n';
    question += `${a} ⋅ ${b} + ${a} ⋅ ${c} = ?`;
    answer = a * b + a * c;
  } else if (level === 3) {
    minNum = 2;
    maxNum = 10;
    const a = getRandInteger(minNum, maxNum);
    const b = getRandInteger(minNum, maxNum);
    const c = getRandInteger(minNum, maxNum);
    const d = a * c;
    const e = b * c;

    question =
      'Nutze das Distributivgesetz der Division\n(a + b) : c = (a : c) + (b : c)\n';
    question += `(${d} + ${e}) : ${c} = ?`;
    answer = a + b;
  } else if (level === 4) {
    const p = Math.random();
    if (p < 0.25) {
      const aArray = [9, 11, 19, 21, 29, 31];
      const a = aArray[getRandInteger(0, aArray.length - 1)];
      const b = getRandInteger(2, 99);
      question = 'Rechne vorteilhaft\n';
      question += `${a} ⋅ ${b} = ?`;
      answer = a * b;
    } else if (p < 0.5) {
      const aArray = [2, 4, 5, 20, 25];
      const a = aArray[getRandInteger(0, aArray.length - 1)];
      const b = getRandInteger(2, 99);
      const c = 100 / a;
      question = 'Rechne vorteilhaft\n';
      question += `${a} ⋅ ${b} ⋅ ${c}= ?`;
      answer = a * b * c;
    } else if (p < 0.75) {
      const a = getRandInteger(12, 99);
      const b = getRandInteger(2, 99);
      const c = a - 10;
      question = 'Rechne vorteilhaft\n';
      question += `${a} ⋅ ${b} - ${c} ⋅ ${b}= ?`;
      answer = a * b - c * b;
    } else {
      const a = getRandInteger(2, 99);
      const b = getRandInteger(19, 21);
      const c = getRandInteger(2, 9);
      question = 'Rechne vorteilhaft\n';
      question += `(${a * b} - ${a * c}) : ${a}= ?`;
      answer = b - c;
    }
  } else {
    const p = Math.random();
    if (p < 0.5) {
      const aArray = [110, 190, 210, 290, 309, 511, 751, 989];
      const a = aArray[getRandInteger(0, aArray.length - 1)];
      const b = getRandInteger(101, 999);
      question = 'Rechne vorteilhaft\n';
      question += `${a} ⋅ ${b} = ?`;
      answer = a * b;
    } else {
      const aArray = [2, 4, 5, 20, 25, 40, 125, 200, 250, 500];
      const a = aArray[getRandInteger(0, aArray.length - 1)];
      const b = getRandInteger(2, 99);
      const c = 1000 / a;
      const dArray = [9, 11, 19, 21, 29, 31];
      const d = dArray[getRandInteger(0, dArray.length - 1)];
      question = 'Rechne vorteilhaft\n';
      question += `${a} ⋅ ${b} ⋅ ${c} ⋅ ${d} = ?`;
      answer = a * b * c * d;
    }
  }
  console.log(question);
  console.log(answer);

  return { question: question, answer: answer, startTime: startTime };
}
