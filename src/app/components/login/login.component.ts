import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SharedService } from '../../shared/shared.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _router: Router,
    public shared: SharedService,
    private _data: DataService
  ) {}

  validStudentId: boolean = true;
  idWasGenerated: boolean;

  ngOnInit(): void {
    // this.studentDocumentIds$ = this._data.getStudentDocumentIds();
  }

  submitId(form: NgForm): void {
    console.log('submitId() called');
    const value = form.value;
    if (value.studentId < 100000 || value.studentId > 999999) {
      this.validStudentId = false;
      return;
    }
    if (value.studentId) {
      // TODO: Need to ensure that the id is unique
      console.log('value.studentId: ' + value.studentId);
      this.validStudentId = true;
      this.shared.setStudentId(value.studentId);
      this._data.getStudentDocumentIds();

      // this.goToClassSelection();
      this.goToMenu();
      // this._data.updateStudentId();
      this.shared.storeStudentIdInLocalStorage();
      // this.getStudentDocumentId();
    } else {
      this.validStudentId = false;
    }
  }

  getStudentDocumentId(): void {
    this.shared.studentDocumentId = 'BbWzvQmUIMpytT5G5bUI';
  }

  goToClassSelection(): void {
    this._router.navigate(['/', 'classselection']);
  }

  goToMenu(): void {
    this._router.navigate(['/', 'menu']);
  }
  /*
  generateId(): void { // TODO: allow users to generate their own id (which needs to be unique)
    this.shared.setStudentId();
    // this._data.updateStudentId();
    this.idWasGenerated = true;
    this.shared.storeStudentIdInLocalStorage();
  }
  */
}
