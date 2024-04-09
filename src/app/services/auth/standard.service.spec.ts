import { TestBed } from '@angular/core/testing';

import { StandardAuth } from './standard.service';

describe('StandardAuth', () => {
  let service: StandardAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
