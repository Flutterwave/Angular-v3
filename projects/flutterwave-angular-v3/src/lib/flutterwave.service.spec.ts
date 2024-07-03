import { TestBed } from '@angular/core/testing';

import { FlutterwaveService } from './flutterwave.service';

describe('FlutterwaveService', () => {
  let service: FlutterwaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlutterwaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
