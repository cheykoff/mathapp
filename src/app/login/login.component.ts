import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _router: Router,
    public shared: SharedService,
    private _data: DataService
  ) {}

  validStudentId: boolean = true;
  idWasGenerated: boolean;

  ngOnInit(): void {}

  submitId(form: NgForm): void {
    const value = form.value;
    console.log(value.studentId);
    if (value.studentId) {
      this.validStudentId = true;
      this.shared.studentId = value.studentId;
      // this.shared.setStudentId();
      this.goToClassSelection();
      this._data.updateStudentId(form.value);
    } else {
      this.validStudentId = false;
    }
  }

  goToClassSelection(): void {
    this._router.navigate(['/', 'classselection']);
  }

  generateId(): void {
    this.shared.setStudentId();
    this._data.updateStudentId(this.shared.getStudentId());
    this.idWasGenerated = true;
    console.log(this.shared.studentId);
  }
}
