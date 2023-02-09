export interface MenuListItem {
  name: string;
  route?: string;
  disabled?: boolean;
}

export const menuListItems: MenuListItem[] = [
  { name: 'Quiz', route: '/quiz' },
  { name: 'Hausaufgaben', route: '/', disabled: true },
  { name: 'Üben', route: '/topics' },
  { name: 'Erfolge', route: '/statistics' },
];
