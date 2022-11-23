import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSetupComponent } from './training-setup.component';

describe('TrainingSetupComponent', () => {
  let component: TrainingSetupComponent;
  let fixture: ComponentFixture<TrainingSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
