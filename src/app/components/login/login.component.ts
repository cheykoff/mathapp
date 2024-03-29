import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, share } from 'rxjs';

import { SharedService } from '../../services/shared.service';
import { CheckIdService } from '../../services/check-id.service';
import { DataService } from '../../services/data.service';
import { GetStudentDataService } from 'src/app/services/get-student-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public shared: SharedService,
    private _router: Router,
    private _getStudentData: GetStudentDataService,
    private _checkIdService: CheckIdService
  ) {}

  defaultStudentId: number;

  validStudentId: boolean = true;
  idWasGenerated: boolean;

  ngOnInit(): void {
    this.defaultStudentId = this.shared.getStudentId();
  }

  submitId(form: NgForm): void {
    const value = form.value;
    if (value.studentId < 100000 || value.studentId > 999999) {
      this.validStudentId = false;
      return;
    }
    if (value.studentId) {
      this.validStudentId = true;
      this.shared.setStudentId(value.studentId);
      this._getStudentData.getStudentDocument(value.studentId);
      this.goToClassSelection();
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

  async generateId(): Promise<void> {
    let newId: number;
    let isUnique: boolean;

    do {
      newId = Math.floor(110000 + Math.random() * 889999);
      isUnique = await this._checkIdService.checkIdIsUnique(newId);
    } while (!isUnique);

    this.shared.setStudentId(newId);
    this._getStudentData.getStudentDocument(newId);
    this.idWasGenerated = true;
    this.shared.storeStudentIdInLocalStorage();
  }
}
