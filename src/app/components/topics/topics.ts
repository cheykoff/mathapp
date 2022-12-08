export interface Topic {
  name: string;
  disabled?: boolean;
}

export const topics: Topic[] = [
  { name: 'Addition' },
  { name: 'Subtraktion' },
  { name: 'Multiplikation' },
  { name: 'Division' },
];
