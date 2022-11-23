import { Component, OnInit } from '@angular/core';

import { MenuListItem, menuListItems } from './menulist';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  header = 'DieMatheApp';
  menuItems: MenuListItem[] = menuListItems;
  constructor() {}

  ngOnInit(): void {}

  onMenuClick(menuItem: MenuListItem) {
    if (menuItem.name === 'Quiz') {
      this.loadQuizzes();
      return;
    }
  }
  loadQuizzes() {
    console.log('loadQuizzes');
  }
}
