import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { DataService } from '../../service/data.service';
import { LoginValidation } from '../../components/login/login.service';

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
    private _login: LoginValidation
  ) {}

  validStudentId: boolean = true;
  idWasGenerated: boolean;

  ngOnInit(): void {}

  submitId(form: NgForm): void {
    console.log('submitId() called');
    this._login.validateStudentId();
    const value = form.value;
    if (value.studentId < 100000 || value.studentId > 999999) {
      this.validStudentId = false;
      return;
    }
    if (value.studentId) {
      this.validStudentId = true;
      this.shared.studentId = value.studentId;
      // this.goToClassSelection();
      this.goToMenu();
      this._data.updateStudentId();
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
    this.shared.setStudentId();
    this._data.updateStudentId();
    this.idWasGenerated = true;
    this.shared.storeStudentIdInLocalStorage();
  }
}
