import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../service/data.service';
import { SharedService } from '../../shared/shared.service';
import { HeaderService } from 'src/app/shared/header.service';

@Component({
  selector: 'app-classselection2',
  templateUrl: './classselection2.component.html',
  styleUrls: ['./classselection2.component.css'],
})
export class Classselection2Component implements OnInit {
  constructor(
    public shared: SharedService,
    private _router: Router,
    private _dataService: DataService,
    private _header: HeaderService
  ) {}

  ngOnInit(): void {
    this._header.setTitle('Wähle deine Klasse');
  }

  selectSchoolClassName(classLetter: string): void {
    const className = this.shared.getSchoolClass() + classLetter;
    this._dataService.storeSchoolClassName(className);
    this.shared.setSchoolClassName(className);
    this._router.navigate(['/', 'menu']);
  }
}
