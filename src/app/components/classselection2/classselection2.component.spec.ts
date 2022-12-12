import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Classselection2Component } from './classselection2.component';

describe('Classselection2Component', () => {
  let component: Classselection2Component;
  let fixture: ComponentFixture<Classselection2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Classselection2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Classselection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
