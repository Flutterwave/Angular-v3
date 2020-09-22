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
export class FlutterwaveModule {
  constructor() {

      const inlineSdk = 'https://checkout.flutterwave.com/v3.js';
      const script = document.createElement('script');
      script.src = inlineSdk;
      if (!document.querySelector(`[src="${inlineSdk}"]`)) {
        document.body.appendChild(script)
      }


  }
}
