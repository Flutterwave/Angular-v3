import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import {Flutterwave} from './flutterwave.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MakePaymentComponent] ,
  providers: [Flutterwave],
  exports: [MakePaymentComponent]
})
export class FlutterwaveModule { }
