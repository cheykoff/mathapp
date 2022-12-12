import { Component, OnInit } from '@angular/core';

import { MenuListItem, menuListItems } from './menulist';
import { SharedService } from '../../shared/shared.service';
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
      console.log('clicked on Quiz');
      this.shared.mode = 'quiz';
      console.log('mode: ' + this.shared.mode);
      localStorage.setItem('mode', 'quiz');
      this._router.navigate(['/', 'exercise']);
      return;
    } else if (menuItem.name === 'Üben') {
      console.log('clicked üben');
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
