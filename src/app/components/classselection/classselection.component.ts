import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../service/data.service';
import { SharedService } from '../../shared/shared.service';
import { SchoolClass, schoolClasses } from './classes';

@Component({
  selector: 'app-classselection',
  templateUrl: './classselection.component.html',
  styleUrls: ['./classselection.component.scss'],
})
export class ClassselectionComponent {
  schoolClasses: SchoolClass[] = schoolClasses;

  constructor(
    private _shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  selectSchoolClass(level: number): void {
    this._dataService.storeSchoolClass(level);
    this._shared.setSchoolClass(level);
    this._router.navigate(['/', 'menu']);
  }
}
