import { TestBed } from '@angular/core/testing';

import { CheckIdService } from './check-id.service';

describe('CheckIdService', () => {
  let service: CheckIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
