export interface Topic {
  id: string;
  name: string;
  classLevels?: number[];
  books?: [
    {
      bookId: string;
      chapters?: [{ number; subchapters?: [{ number; pages?: [{ number }] }] }];
    }
  ];
}
