export interface MenuListItem {
  name: string;
  route?: string;
  disabled?: boolean;
}

export const menuListItems: MenuListItem[] = [
  { name: 'Quiz', route: '/quiz', disabled: true },
  { name: 'Üben', route: '/topics' },
  { name: 'Erfolge', route: '/', disabled: true },
];
