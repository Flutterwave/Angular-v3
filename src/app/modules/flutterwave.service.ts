import { Injectable } from '@angular/core';
import {AsyncPaymentOptions, FlutterwaveCheckout, InlinePaymentOptions, PaymentSuccessResponse} from './models';

@Injectable()
export class Flutterwave {

  constructor() { }

  inlinePay(paymentData: InlinePaymentOptions){

    let data = {
      ...paymentData,
      callback: response => {
        paymentData.callbackContext[paymentData.callback.name](response)
      } ,
      onclose: () => {
        try {
          paymentData.callbackContext[paymentData.onclose.name]()
        }
        catch (e) {
        }
      }
    }

    FlutterwaveCheckout(data);

  }

  asyncInlinePay(paymentData: AsyncPaymentOptions): Promise<PaymentSuccessResponse | 'closed'>{

    return new Promise((resolve, reject) => {

      paymentData = {
        ...paymentData,
        callback: ($event) => {
          resolve($event)
        } ,
        onclose: () => resolve('closed')
      }

      FlutterwaveCheckout(paymentData)

    })

  }


  /**
   *
   * @param waitDuration {Number} Seconds before closing payment modal
   */
  closePaymentModal(waitDuration: number = 0){

    setTimeout(()=>{
      document.getElementsByName('checkout')[0].setAttribute('style', "z-index: -1; opacity: 0")

    } , waitDuration * 1000 )


  }

}
