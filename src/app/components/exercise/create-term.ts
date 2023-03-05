import { getRandInteger } from './exercise-util';

export function createTerm(level: number): {
  question: string;
  answer: number;
  startTime: Date;
} {
  // TODO: Create more terms with brackets -> change probabilities
  const startTime = new Date();
  let question: string;
  let answer: number;
  let minNum = 0;
  let maxNum = 0;
  let operatorsNum = 0;
  if (level === 1) {
    minNum = 1;
    maxNum = 20;
    operatorsNum = 2;
  } else if (level === 2) {
    minNum = 10;
    maxNum = 100;
    operatorsNum = 3;
  } else if (level === 3) {
    minNum = 100;
    maxNum = 1000;
    operatorsNum = 4;
  } else {
    minNum = 1000;
    maxNum = 10000;
    operatorsNum = 4;
  }
  let result = -1;
  while (result < 0) {
    const a = getRandInteger(minNum, 2 * maxNum);
    const b = getRandInteger(minNum, maxNum);
    const c = getRandInteger(minNum, maxNum);
    const d = getRandInteger(minNum, maxNum);
    const e = getRandInteger(minNum, maxNum);
    const operatorRandom = getRandInteger(1, 16);
    const bracketRandom = getRandInteger(1, 8);

    if (level === 1) {
      if (operatorRandom % 4 === 0) {
        question = `${a} + ${b} + ${c} = ?`;
        answer = a + b + c;
      } else if (operatorRandom % 4 === 1) {
        question = `${a} + ${b} - ${c} = ?`;
        answer = a + b - c;
      } else if (operatorRandom % 4 === 2) {
        if (bracketRandom % 2 === 0) {
          question = `${a} - (${b} + ${c}) = ?`;
          answer = a - (b + c);
        } else {
          question = `${a} - ${b} + ${c} = ?`;
          answer = a - b + c;
        }
      } else {
        if (bracketRandom % 2 === 0) {
          question = `${a} - (${b} - ${c}) = ?`;
          answer = a - (b - c);
        } else {
          question = `${a} - ${b} - ${c} = ?`;
          answer = a - b - c;
        }
      }
    } else if (level === 2) {
      if (operatorRandom % 8 === 0) {
        question = `${a} + ${b} + ${c} + ${d} = ?`;
        answer = a + b + c + d;
      } else if (operatorRandom % 8 === 1) {
        question = `${a} + ${b} + ${c} - ${d} = ?`;
        answer = a + b + c - d;
      } else if (operatorRandom % 8 === 2) {
        if (bracketRandom % 2 === 0) {
          question = `${a} + ${b} - (${c} + ${d}) = ?`;
          answer = a + b - (c + d);
        } else {
          question = `${a} + ${b} - ${c} + ${d} = ?`;
          answer = a + b - c + d;
        }
      } else if (operatorRandom % 8 === 3) {
        if (bracketRandom % 2 === 0) {
          question = `${a} + ${b} - (${c} - ${d}) = ?`;
          answer = a + b - (c - d);
        } else {
          question = `${a} + ${b} - ${c} - ${d} = ?`;
          answer = a + b - c - d;
        }
      } else if (operatorRandom % 8 === 4) {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} + ${c}) + ${d} = ?`;
          answer = a - (b + c) + d;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - (${b} + ${c} + ${d}) = ?`;
          answer = a - (b + c + d);
        } else {
          question = `${a} - ${b} + ${c} + ${d} = ?`;
          answer = a - b + c + d;
        }
      } else if (operatorRandom % 8 === 5) {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} + ${c}) - ${d} = ?`;
          answer = a - (b + c) - d;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - (${b} + ${c} - ${d}) = ?`;
          answer = a - (b + c - d);
        } else {
          question = `${a} - ${b} + ${c} - ${d} = ?`;
          answer = a - b + c - d;
        }
      } else if (operatorRandom % 8 === 6) {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} - ${c}) + ${d} = ?`;
          answer = a - (b - c) + d;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - (${b} - ${c} + ${d}) = ?`;
          answer = a - (b - c + d);
        } else if (bracketRandom % 4 === 2) {
          question = `${a} - [${b} - (${c} + ${d})] = ?`;
          answer = a - (b - (c + d));
        } else {
          question = `${a} - ${b} - ${c} + ${d} = ?`;
          answer = a - b - c + d;
        }
      } else {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} - ${c}) - ${d} = ?`;
          answer = a - (b - c) - d;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - ${b} - (${c} - ${d}) = ?`;
          answer = a - b - (c - d);
        } else if (bracketRandom % 4 === 2) {
          question = `${a} - [${b} - (${c} - ${d})] = ?`;
          answer = a - (b - (c - d));
        } else {
          question = `${a} - ${b} - ${c} - ${d} = ?`;
          answer = a - b - c - d;
        }
      }
    } else if (level === 3) {
      if (operatorRandom % 16 === 0) {
        question = `${a} + ${b} + ${c} + ${d} + ${e} = ?`;
        answer = a + b + c + d + e;
      } else if (operatorRandom % 16 === 1) {
        question = `${a} + ${b} + ${c} + ${d} - ${e} = ?`;
        answer = a + b + c + d - e;
      } else if (operatorRandom % 16 === 2) {
        if (bracketRandom % 2 === 0) {
          question = `${a} + ${b} + ${c} - (${d} + ${e}) = ?`;
          answer = a + b + c - (d + e);
        } else {
          question = `${a} + ${b} + ${c} - ${d} + ${e} = ?`;
          answer = a + b + c - d + e;
        }
      } else if (operatorRandom % 16 === 3) {
        if (bracketRandom % 2 === 0) {
          question = `${a} + ${b} + ${c} - (${d} - ${e}) = ?`;
          answer = a + b + c - (d - e);
        } else {
          question = `${a} + ${b} + ${c} - ${d} - ${e} = ?`;
          answer = a + b + c - d - e;
        }
      } else if (operatorRandom % 16 === 4) {
        if (bracketRandom % 4 === 0) {
          question = `${a} + ${b} - (${c} + ${d}) + ${e} = ?`;
          answer = a + b - (c + d) + e;
        } else if (bracketRandom % 4 === 2) {
          question = `${a} + ${b} - (${c} + ${d} + ${e}) = ?`;
          answer = a + b - (c + d + e);
        } else {
          question = `${a} + ${b} - ${c} + ${d} + ${e} = ?`;
          answer = a + b - c + d + e;
        }
      } else if (operatorRandom % 16 === 5) {
        if (bracketRandom % 4 === 0) {
          question = `${a} + ${b} - (${c} + ${d}) - ${e} = ?`;
          answer = a + b - (c + d) - e;
        } else if (bracketRandom % 4 === 0) {
          question = `${a} + ${b} - (${c} + ${d} - ${e}) = ?`;
          answer = a + b - (c + d - e);
        } else {
          question = `${a} + ${b} - ${c} + ${d} - ${e} = ?`;
          answer = a + b - c + d - e;
        }
      } else if (operatorRandom % 16 === 6) {
        if (bracketRandom % 4 === 0) {
          question = `${a} + ${b} - (${c} - ${d}) + ${e} = ?`;
          answer = a + b - (c - d) + e;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} + ${b} - ${c} - (${d} + ${e}) = ?`;
          answer = a + b - c - (d + e);
        }
        if (bracketRandom % 4 === 2) {
          question = `${a} + ${b} - (${c} - ${d} + ${e}) = ?`;
          answer = a + b - (c - d + e);
        } else {
          question = `${a} + ${b} - [(${c} - (${d} + ${e})] = ?`;
          answer = a + b - (c - (d + e));
        }
      } else if (operatorRandom % 16 === 7) {
        if (bracketRandom % 4 === 0) {
          question = `${a} + ${b} - ${c} - ${d} - ${e} = ?`;
          answer = a + b - c - d - e;
        } else if (bracketRandom % 4 === 2) {
          question = `${a} + ${b} - (${c} - ${d} - ${e}) = ?`;
          answer = a + b - (c - d - e);
        } else if (bracketRandom % 4 === 3) {
          question = `${a} + ${b} - (${c} - (${d} - ${e})) = ?`;
          answer = a + b - (c - (d - e));
        } else {
          question = `${a} + ${b} - (${c} - ${d}) - ${e} = ?`;
          answer = a + b - (c - d) - e;
        }
      } else if (operatorRandom % 16 === 8) {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} + ${c}) + ${d} + ${e} = ?`;
          answer = a - (b + c) + d + e;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - (${b} + ${c}) + ${d} + ${e} = ?`;
          answer = a - (b + c + d) + e;
        } else if (bracketRandom % 4 === 2) {
          question = `${a} - (${b} + ${c} + ${d} + ${e}) = ?`;
          answer = a - (b + c + d + e);
        } else {
          question = `${a} - ${b} + ${c} + ${d} + ${e} = ?`;
          answer = a - b + c + d + e;
        }
      } else if (operatorRandom % 16 === 9) {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} + ${c}) + ${d} - ${e} = ?`;
          answer = a - (b + c) + d - e;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - (${b} + ${c} + ${d}) - ${e} = ?`;
          answer = a - (b + c + d) - e;
        } else if (bracketRandom % 4 === 2) {
          question = `${a} - (${b} + ${c} + ${d} - ${e}) = ?`;
          answer = a - (b + c + d - e);
        } else {
          question = `${a} - ${b} + ${c} + ${d} - ${e} = ?`;
          answer = a - b + c + d - e;
        }
      } else if (operatorRandom % 16 === 10) {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} + ${c}) - ${d} + ${e} = ?`;
          answer = a - (b + c) - d + e;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - (${b} + ${c} - ${d}) + ${e} = ?`;
          answer = a - (b + c - d) + e;
        } else if (bracketRandom % 4 === 2) {
          question = `${a} - (${b} + ${c}) + (${d} + ${e}) = ?`;
          answer = a - (b + c) - (d + e);
        } else {
          question = `${a} - ${b} + ${c} - ${d} + ${e} = ?`;
          answer = a - b + c - d + e;
        }
      } else if (operatorRandom % 16 === 11) {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} + ${c}) - ${d} - ${e} = ?`;
          answer = a - (b + c) - d - e;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - (${b} + ${c} - ${d}) - ${e} = ?`;
          answer = a - (b + c - d) - e;
        } else if (bracketRandom % 4 === 2) {
          question = `${a} - [(${b} + ${c}) - (${d} + ${e})]= ?`;
          answer = a - (b + c - (d + e));
        } else {
          question = `${a} - ${b} + ${c} - (${d} - ${e}) = ?`;
          answer = a - b + c - (d - e);
        }
      } else if (operatorRandom % 16 === 12) {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} - ${c}) + ${d} + ${e} = ?`;
          answer = a - (b - c) + d + e;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - ${b} - (${c} + ${d}) + ${e} = ?`;
          answer = a - b - (c + d) + e;
        } else if (bracketRandom % 4 === 2) {
          question = `${a} - (${b} - ${c} + ${d}) + ${e} = ?`;
          answer = a - (b - c + d) + e;
        } else {
          question = `${a} - ${b} - ${c} + ${d} + ${e} = ?`;
          answer = a - b - c + d + e;
        }
      } else if (operatorRandom % 16 === 13) {
        if (bracketRandom % 4 === 0) {
          question = `${a} - [(${b} - ${c}) + ${d} - ${e}] = ?`;
          answer = a - (b - c + d - e);
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - ${b} - (${c} + ${d}) - ${e} = ?`;
          answer = a - b - (c + d) - e;
        } else if (bracketRandom % 4 === 2) {
          question = `${a} - (${b} - ${c} + ${d}) - ${e} = ?`;
          answer = a - (b - c + d) - e;
        } else {
          question = `${a} - [${b} - (${c} + ${d})] - ${e} = ?`;
          answer = a - (b - (c + d)) - e;
        }
      } else if (operatorRandom % 16 === 14) {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} - ${c}) - ${d} + ${e} = ?`;
          answer = a - (b - c) - d + e;
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - ${b} - (${c} - ${d}) + ${e} = ?`;
          answer = a - b - (c - d) + e;
        } else if (bracketRandom % 4 === 2) {
          question = `${a} - (${b} - ${c} - ${d}) + ${e} = ?`;
          answer = a - (b - c - d) + e;
        } else {
          question = `${a} - [${b} - (${c} - ${d})] + ${e} = ?`;
          answer = a - (b - (c - d)) + e;
        }
      } else {
        if (bracketRandom % 4 === 0) {
          question = `${a} - (${b} - ${c}) - (${d} - ${e}) = ?`;
          answer = a - (b - c) - (d - e);
        } else if (bracketRandom % 4 === 1) {
          question = `${a} - [${b} - (${c} - ${d})] - ${e} = ?`;
          answer = a - b - (c - d) - e;
        } else if (bracketRandom % 4 === 2) {
          question = `${a} - [${b} - (${c} - ${d}) - ${e}] = ?`;
          answer = a - (b - (c - d) - e);
        } else {
          question = `${a} - [${b} - [${c} - (${d} - ${e})]] = ?`;
          answer = a - (b - (c - (d - e)));
        }
      }
    } else {
      question = `${a} + ${b} + ${c} = ?`;
      answer = a + b + c;
    }
    result = answer;
  }

  return { question: question, answer: answer, startTime: startTime };
}
