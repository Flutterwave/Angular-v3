import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentComponent } from './make-payment.component';

describe('MakePaymentComponent', () => {
  let component: MakePaymentComponent;
  let fixture: ComponentFixture<MakePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakePaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
