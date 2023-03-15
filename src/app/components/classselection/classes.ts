export interface SchoolClass {
  level: number;
  disabled?: boolean;
  name?: string; 
}

export const schoolClasses: SchoolClass[] = [
  { level: 1, name: 'GPT-4 Demo' },
  { level: 5, disabled: true},
  { level: 6, disabled: true},
  { level: 7, disabled: true },
  { level: 8, disabled: true },
  { level: 9, disabled: true },
  { level: 10, disabled: true },
  { level: 11, disabled: true },
  { level: 12, disabled: true },
];
