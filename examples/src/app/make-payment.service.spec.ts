import { TestBed } from '@angular/core/testing';

import { MakePaymentService } from './make-payment.service';

describe('MakePaymentService', () => {
  let service: MakePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
