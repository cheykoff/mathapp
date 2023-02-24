import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckanswerComponent } from './checkanswer.component';

describe('CheckanswerComponent', () => {
  let component: CheckanswerComponent;
  let fixture: ComponentFixture<CheckanswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckanswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckanswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
