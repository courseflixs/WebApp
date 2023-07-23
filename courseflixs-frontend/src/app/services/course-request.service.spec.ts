import { TestBed } from '@angular/core/testing';

import { CourseRequestService } from './course-request.service';

describe('CourseRequestService', () => {
  let service: CourseRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
