import { TestBed } from '@angular/core/testing';

import { ApiTrackingService } from './api-tracking.service';

describe('ApiTrackingService', () => {
  let service: ApiTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
