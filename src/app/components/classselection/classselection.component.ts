import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../service/data.service';
import { SharedService } from '../../shared/shared.service';
import { HeaderService } from 'src/app/shared/header.service';
import { SchoolClass, schoolClasses } from './classes';

@Component({
  selector: 'app-classselection',
  templateUrl: './classselection.component.html',
  styleUrls: ['./classselection.component.scss'],
})
export class ClassselectionComponent implements OnInit {
  schoolClasses: SchoolClass[] = schoolClasses;

  constructor(
    private _shared: SharedService,
    private _router: Router,
    private _dataService: DataService,
    private _header: HeaderService
  ) {}

  ngOnInit(): void {
    this._header.setTitle('Wähle deine Klasse');
  }

  selectSchoolClass(level: number): void {
    this._dataService.storeSchoolClass(level);
    this._shared.setSchoolClass(level);
    this._router.navigate(['/', 'classselection2']);
  }

  private _goToExercise(): void {
    // TODO: implement with level routing
    this._router.navigate(['/', 'exercise']);
  }

  private _goToCodePage(): void {
    // TODO: implement with level routing
    this._router.navigate(['/', 'codepage']);
  }
}
