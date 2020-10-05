import { Injectable } from '@angular/core';
import {AsyncPaymentOptions, FlutterwaveCheckout, InlinePaymentOptions, PaymentSuccessResponse} from './models';

@Injectable()
export class Flutterwave {

  constructor() { }

  inlinePay(paymentData: InlinePaymentOptions) {

    const data = {
      ...paymentData,
      callback: response => {
        paymentData.callbackContext[paymentData.callback.name](response)
      } ,
      onclose: () => {
        try {
          paymentData.callbackContext[paymentData.onclose.name]()
        } catch (e) {}
      }
    };

    FlutterwaveCheckout(data);

  }

  asyncInlinePay(paymentData: AsyncPaymentOptions): Promise<PaymentSuccessResponse | 'closed'> {

    return new Promise((resolve, reject) => {

      paymentData = {
        ...paymentData,
        callback: ($event) => {
          resolve($event)
        } ,
        onclose: () => resolve('closed')
      };

      FlutterwaveCheckout(paymentData)

    })

  }


  /**
   *
   * @param waitDuration {Number} Seconds before closing payment modal
   */
  closePaymentModal(waitDuration: number = 0) {
    setTimeout(() => {
      document.getElementsByName('checkout')[0].setAttribute('style',
        'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
      document.body.style.overflow = '';
     // document.getElementsByName('checkout')[0].setAttribute('style', 'z-index: -1; opacity: 0')
    } , waitDuration * 1000 )
  }

}
