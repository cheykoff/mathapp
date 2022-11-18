import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicExerciseComponent } from './dynamic-exercise.component';

describe('DynamicExerciseComponent', () => {
  let component: DynamicExerciseComponent;
  let fixture: ComponentFixture<DynamicExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicExerciseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
