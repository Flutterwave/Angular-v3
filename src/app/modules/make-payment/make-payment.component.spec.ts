import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlutterwaveModule } from "../flutterwave.module";

import { MakePaymentComponent } from "./make-payment.component";

describe("MakePaymentComponent", () => {
  let component: MakePaymentComponent;
  let fixture: ComponentFixture<MakePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FlutterwaveModule],
      //  declarations: [MakePaymentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});