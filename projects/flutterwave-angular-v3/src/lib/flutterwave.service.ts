// This reference is necessary to ensure TypeScript recognizes the global FlutterwaveCheckout function.
/// <reference path="../index.d.ts" />

import { Injectable } from '@angular/core';
import { AsyncPaymentOptions, InlinePaymentOptions, PaymentSuccessResponse } from './models';
import { ApiTrackingService } from './api-tracking.service';

@Injectable({providedIn: 'root'})
export class FlutterwaveService {
  constructor(private tracker: ApiTrackingService) {
  }

  inlinePay(paymentData: InlinePaymentOptions) {
    const data = {
      ...paymentData,
      callback: (response: PaymentSuccessResponse) => {
        this.submitToTracker(paymentData , response,  10000);
        if (paymentData.callbackContext && paymentData.callback) {
          (paymentData.callbackContext as { [key: string]: Function })[paymentData.callback.name](response);
        }
      },
      onclose: () => {
        try {
          if (paymentData.callbackContext && paymentData.onclose) {
            (paymentData.callbackContext as { [key: string]: Function })[paymentData.onclose.name]();
          }
        } catch (e) {}
      }
    };

    if (window.FlutterwaveCheckout) {
      window.FlutterwaveCheckout(data);
    } else {
      console.error('FlutterwaveCheckout is not defined');
    }
  }

  asyncInlinePay(paymentData: AsyncPaymentOptions): Promise<PaymentSuccessResponse | 'closed'> {
    return new Promise((resolve, reject) => {
      paymentData = {
        ...paymentData,
        callback: ($event: PaymentSuccessResponse) => {
          this.submitToTracker(paymentData , $event,  10000);
          resolve($event);
        },
        onclose: () => resolve('closed')
      };

      if (window.FlutterwaveCheckout) {
        window.FlutterwaveCheckout(paymentData);
      } else {
        console.error('FlutterwaveCheckout is not defined');
      }
    });
  }

  submitToTracker(paymentData: any, response: any, responseTime: any) {
    this.tracker.track({
      paymentData,
      response,
      responseTime
    });
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
    }, waitDuration * 1000);
  }
}
