import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, share } from 'rxjs';

import { SharedService } from '../../shared/shared.service';
import { DataService } from '../../service/data.service';
import { HeaderService } from 'src/app/shared/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _router: Router,
    public shared: SharedService,
    private _data: DataService,
    private _header: HeaderService
  ) {}

  defaultStudentId: number;

  validStudentId: boolean = true;
  idWasGenerated: boolean;

  ngOnInit(): void {
    this._header.setTitle('Login');
    // this.studentDocumentIds$ = this._data.getStudentDocumentIds();
    // this.shared.reloadStudentData();
    this.defaultStudentId = this.shared.getStudentId();
  }

  submitId(form: NgForm): void {
    const value = form.value;
    if (value.studentId < 100000 || value.studentId > 999999) {
      this.validStudentId = false;
      return;
    }
    if (value.studentId) {
      // TODO: Need to ensure that the id is unique

      this.validStudentId = true;
      this.shared.setStudentId(value.studentId);
      this._data.getStudentDocument(value.studentId);
      this.goToClassSelection();
      // this.goToMenu();
      this.shared.storeStudentIdInLocalStorage();
    } else {
      this.validStudentId = false;
    }
  }

  goToClassSelection(): void {
    this._router.navigate(['/', 'classselection']);
  }

  goToMenu(): void {
    this._router.navigate(['/', 'menu']);
  }

  generateId(): void {
    // TODO: allow users to generate their own id (which needs to be unique)
    const newId = Math.floor(110000 + Math.random() * 890000);
    this.shared.setStudentId(newId);
    this._data.getStudentDocument(newId);
    this.idWasGenerated = true;
    this.shared.storeStudentIdInLocalStorage();
  }
}
