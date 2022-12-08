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
];
