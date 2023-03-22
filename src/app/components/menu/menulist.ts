export interface MenuListItem {
  name: string;
  route?: string;
  disabled?: boolean;
}

export const menuListItems: MenuListItem[] = [
  { name: 'Quiz', route: '/quiz' },
  { name: 'Testschulaufgabe', route: '/quiz' },
  { name: 'Üben', route: '/topics' },
  { name: 'Erfolge', route: '/statistics' },
];
