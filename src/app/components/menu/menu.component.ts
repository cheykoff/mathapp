import { Component, OnInit } from '@angular/core';

import { MenuListItem, menuListItems } from './menulist';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  header = 'DieMatheApp';
  menuItems: MenuListItem[] = menuListItems;
  constructor(public shared: SharedService, private _router: Router) {}

  ngOnInit(): void {}

  onMenuItemClick(menuItem: MenuListItem) {
    if (menuItem.name === 'Quiz') {
      this.shared.mode = 'quiz';
      localStorage.setItem('mode', 'quiz');
      this._router.navigate(['/', 'chapterselection']);
      return;
    } else if (menuItem.name === 'Testschulaufgabe') {
      this.shared.mode = 'test';
      localStorage.setItem('mode', 'practice');
      this._router.navigate(['/', 'exercise']);
      return;
    } else if (menuItem.name === 'Üben') {
      this.shared.mode = 'practice';
      localStorage.setItem('mode', 'practice');
      this._router.navigate(['/', 'topics']);
      return;
    } else if (menuItem.name === 'Erfolge') {
      this._router.navigate(['/', 'statistics']);
      return;
    }
  }
}
