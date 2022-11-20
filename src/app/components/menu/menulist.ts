export interface MenuListItem {
  name: string;
  route?: string;
  disabled?: boolean;
}

export const menuListItems: MenuListItem[] = [
  { name: 'Quiz', route: '/quiz' },
  { name: 'Üben', route: '/training' },
  { name: 'Erfolge', route: '/', disabled: true },
];
