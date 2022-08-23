import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classselection',
  templateUrl: './classselection.component.html',
  styleUrls: ['./classselection.component.css'],
})
export class ClassselectionComponent implements OnInit {
  schoolClass: number = 0;

  constructor(private shared: SharedService, private router: Router) {}

  ngOnInit(): void {}

  selectSchoolClass(className: number): void {
    console.log('select schoolClass: ' + className);
    this.schoolClass = className;
    this.shared.setSchoolClass(className);
    this.goToExercise();
  }

  goToExercise() {
    this.router.navigate(['/', 'exercise']);
  }
}
