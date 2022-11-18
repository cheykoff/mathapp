import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelpageComponent } from './levelpage.component';

describe('LevelpageComponent', () => {
  let component: LevelpageComponent;
  let fixture: ComponentFixture<LevelpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
