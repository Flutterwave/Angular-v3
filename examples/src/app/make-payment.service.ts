import { Injectable } from '@angular/core';
import {Flutterwave, InlinePaymentOptions, AsyncPaymentOptions} from 'flutterwave-angular-v3';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private flutterwave: Flutterwave) {}

  makePayment(componentPaymentDetails){

    let servicePaymentData = {...componentPaymentDetails,
      callbackContext: this,
      callback: this.paymentCallBack
    }

    //this to use to caller component/service context & callback
    this.flutterwave.inlinePay(componentPaymentDetails)

    //this to use this service context & callback
   // this.flutterwave.inlinePay(servicePaymentData)

  }

  paymentCallBack(res){
    console.log('test service callback', res)
    this.flutterwave.closePaymentModal(5)
  }

  makePaymentViaPromise(paymentData): Promise<any>{
    return  this.flutterwave.asyncInlinePay(paymentData)
  }

}
