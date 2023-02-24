import { TestBed } from '@angular/core/testing';

import { CheckanswerService } from './checkanswer.service';

describe('CheckanswerService', () => {
  let service: CheckanswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckanswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
