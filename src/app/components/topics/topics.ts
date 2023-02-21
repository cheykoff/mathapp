export interface Topic {
  name: string;
  disabled?: boolean;
  hidden?: boolean;
}

export let topics: Topic[] = [
  { name: 'Addition' },
  { name: 'Subtraktion' },
  { name: 'Multiplikation' },
  { name: 'Division' },
  { name: 'Terme' },
  // { name: 'Terme mit Zahlen' },
  //{ name: 'Terme mit Fachbegriffen' },
  // { name: 'Quadratzahlen' }, // chapter 4, subchapter 5, questionNumber 11, version 1-20
  // { name: 'Zahlenreihe' },
  // { name: 'Unbekannte Zahl' },
  // { name: 'Knobelaufgaben' },
];
