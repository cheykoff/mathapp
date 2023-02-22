export interface Chapter {
  chapterNumber: number;
  chapterName: string;
  disabled?: boolean;
}

export const chapters: Chapter[] = [
  { chapterNumber: 1, chapterName: 'Natürliche und ganze Zahlen' },
  { chapterNumber: 2, chapterName: 'Addition und Subtraktion ganzer Zahlen' },
  {
    chapterNumber: 3,
    chapterName: 'Geometriesche Figuren und Lagebeziehungen',
  },
  {
    chapterNumber: 4,
    chapterName: 'Multiplikation und Division ganzer Zahlen',
  },
  { chapterNumber: 5, chapterName: 'Größen' },
  { chapterNumber: 6, chapterName: 'Flächen' },
];
