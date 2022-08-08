import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassselectionComponent } from './classselection.component';

describe('ClassselectionComponent', () => {
  let component: ClassselectionComponent;
  let fixture: ComponentFixture<ClassselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassselectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
