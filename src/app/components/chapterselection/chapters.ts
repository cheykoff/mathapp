export interface Chapter {
  classLevel: number;
  chapterNumber: number;
  chapterName: string;
  disabled?: boolean;
}

export const chapters: Chapter[] = [
  {
    classLevel: 5,
    chapterNumber: 1,
    chapterName: 'Natürliche und ganze Zahlen',
  },
  {
    classLevel: 5,
    chapterNumber: 2,
    chapterName: 'Addition und Subtraktion ganzer Zahlen',
  },
  {
    classLevel: 5,
    chapterNumber: 3,
    chapterName: 'Geometrische Figuren und Lagebeziehungen',
  },
  {
    classLevel: 5,
    chapterNumber: 4,
    chapterName: 'Multiplikation und Division ganzer Zahlen',
  },
  { classLevel: 5, chapterNumber: 5, chapterName: 'Größen' },
  { classLevel: 5, chapterNumber: 6, chapterName: 'Flächen' },
  { classLevel: 6, chapterNumber: 1, chapterName: 'Brüche und Dezimalbrüche' },
  {
    classLevel: 6,
    chapterNumber: 2,
    chapterName: 'Addition und Subtraktion von Brüchen',
  },
  {
    classLevel: 6,
    chapterNumber: 3,
    chapterName: 'Multiplikation und Division von Brüchen',
  },
  {
    classLevel: 6,
    chapterNumber: 4,
    chapterName: 'Flächeninhalt',
  },
  {
    classLevel: 6,
    chapterNumber: 5,
    chapterName: 'Volumen',
    disabled: true,
  },
  {
    classLevel: 6,
    chapterNumber: 6,
    chapterName: 'Rechnen mit rationalen Zahlen',
    disabled: true,
  },
  {
    classLevel: 6,
    chapterNumber: 7,
    chapterName: 'Prozentrechnung, Daten und Diagramme',
    disabled: true,
  },
];
