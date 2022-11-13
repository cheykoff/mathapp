import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Fraction } from '../shared/fraction';
import { EquationPipe } from '../mathequation.pipe';

import { DataService } from '../service/data.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-fraction',
  templateUrl: './fraction.component.html',
  styleUrls: ['./fraction.component.css'],
})
export class FractionComponent implements OnInit {
  fractions$: Observable<Fraction[]>;

  currentQuestion: number = 0;
  content = 'This is an equation $\\frac{1}{3}$';
  content2 = '';

  constructor(
    private _router: Router,
    private _dataService: DataService,
    public shared: SharedService
  ) {}

  ngOnInit(): void {
    this.fractions$ = this._dataService.getFractions();
  }
}
