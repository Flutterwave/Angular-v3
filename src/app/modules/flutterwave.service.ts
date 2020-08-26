import { Injectable } from '@angular/core';
import {FlutterwaveCheckout, InlinePaymentOptions} from './models';


@Injectable()
export class Flutterwave {

  constructor() { }

  inlinePay(paymentData: InlinePaymentOptions){

    FlutterwaveCheckout(paymentData);

  }

}
