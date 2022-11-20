export interface MenuListItem {
  name: string;
  route?: string;
  disabled?: boolean;
}

export const menuListItems: MenuListItem[] = [
  { name: 'Quiz', route: '/quiz' },
  { name: 'Üben', route: '/', disabled: true },
  { name: 'Erfolge', route: '/', disabled: true },
];
