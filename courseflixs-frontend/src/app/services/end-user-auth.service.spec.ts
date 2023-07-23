import { TestBed } from '@angular/core/testing';

import { EndUserAuthService } from './end-user-auth.service';

describe('EndUserAuthService', () => {
  let service: EndUserAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndUserAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
