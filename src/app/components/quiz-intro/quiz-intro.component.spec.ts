import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizIntroComponent } from './quiz-intro.component';

describe('QuizIntroComponent', () => {
  let component: QuizIntroComponent;
  let fixture: ComponentFixture<QuizIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
