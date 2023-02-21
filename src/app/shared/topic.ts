export interface Topic {
  id: string;
  name: string;
  classLevels?: number[];
  books?: [
    {
      bookId: string;
      chapters?: [
        {
          chapter: number;
          subchapters?: [
            {
              subchapter: number;
            }
          ];
        }
      ];
    }
  ];
}
