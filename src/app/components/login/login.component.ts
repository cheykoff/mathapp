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
    const value = form.value;
    if (value.studentId < 100000 || value.studentId > 999999) {
      this.validStudentId = false;
      return;
    }
    if (value.studentId) {
      // TODO: Need to ensure that the id is unique

      this.validStudentId = true;
      this._data.getStudentDocument(value.studentId);
      this.goToMenu();
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
    const newId = Math.floor(100000 + Math.random() * 900000);
    this.shared.setStudentId(newId);
    this.idWasGenerated = true;
    this.shared.storeStudentIdInLocalStorage();
  }
}
