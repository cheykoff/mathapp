import { Component, OnInit } from '@angular/core';

import { MenuListItem, menuListItems } from './menulist';
import { SharedService } from '../../shared/shared.service';
import { HeaderService } from 'src/app/shared/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  header = 'DieMatheApp';
  menuItems: MenuListItem[] = menuListItems;
  constructor(
    public shared: SharedService,
    private _router: Router,
    private _header: HeaderService
  ) {}

  ngOnInit(): void {
    this._header.setTitle('Menü');
  }

  onMenuItemClick(menuItem: MenuListItem) {
    if (menuItem.name === 'Quiz') {
      this.shared.mode = 'quiz';
      localStorage.setItem('mode', 'quiz');
      this._router.navigate(['/', 'exercise']);
      return;
    } else if (menuItem.name === 'Hausaufgaben') {
      this.shared.mode = 'practice';
      localStorage.setItem('mode', 'practice');
      this.shared.topic = 'Terme';
      localStorage.setItem('topic', 'Terme');
      this._router.navigate(['/', 'levelpage']);
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
