import { Component, EventEmitter, Injectable, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Payment data object
 * \@property public_key {String}
 * \@property callbackContext {Object}  The context of the
 * component or service that has the callback method.
 * The value must always be 'this'.
 * Using any other value might lead to error.
 * \@property tx_ref {String}
 * \@property amount {Number}
 * \@property currency {String}
 * \@property payment_options {String}
 * \@property redirect_url {String}
 * \@property meta {Object}
 * \@property customer {Object}
 * \@property customizations {Object}
 * \@property callback {Function}
 * \@property onclose {Function}
 */
class InlinePaymentOptions {
}
/**
 * Async Payment data object
 * \@property public_key {String}
 * \@property tx_ref {String}
 * \@property amount {Number}
 * \@property currency {String}
 * \@property payment_options {String}
 * \@property meta {Object}
 * \@property customer {Object}
 * \@property customizations {Object}
 */
class AsyncPaymentOptions {
}
/**
 * Payment Response
 * \@property amount {String}
 * \@property currency {Number}
 * \@property customer {Object}
 * \@property flw_ref {String}
 * \@property status {String}
 * \@property transaction_id {String}
 * \@property tx_ref {String}
 */
class PaymentSuccessResponse {
}

class MakePaymentComponent {
    constructor() {
        this.callback = new EventEmitter();
        this.close = new EventEmitter();
        this.customer_defaults = {
            email: '',
            phone_number: '',
            name: '',
        };
        this.meta_defaults = {
            consumer_id: '',
            consumer_mac: '',
        };
        this.customizations_defaults = {
            title: '',
            description: '',
            logo: '',
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    makePayment() {
        this.prepareForPayment();
        FlutterwaveCheckout(this.inlinePaymentOptions);
    }
    /**
     * @return {?}
     */
    prepareForPayment() {
        this.customer = this.customer || {};
        this.meta = this.meta || {};
        this.customizations = this.customizations || {};
        if (this.data) {
            this.inlinePaymentOptions = Object.assign({}, this.data, { callback: response => {
                    this.data.callbackContext[this.data.callback.name](response);
                }, onclose: () => {
                    try {
                        this.data.callbackContext[this.data.onclose.name]();
                    }
                    catch (e) {
                    }
                } });
        }
        else {
            this.inlinePaymentOptions = {
                callbackContext: null,
                public_key: this.public_key,
                tx_ref: this.tx_ref,
                amount: this.amount,
                currency: this.currency || 'NGN',
                payment_options: this.payment_options || 'card, mobilemoney, ussd',
                redirect_url: this.redirect_url || '',
                meta: Object.assign({}, this.meta_defaults, this.meta),
                customer: Object.assign({}, this.customer_defaults, this.customer),
                callback: (response) => {
                    this.callback.emit(response);
                },
                onclose: () => this.close.emit(),
                customizations: Object.assign({}, this.customizations_defaults, this.customizations)
            };
        }
    }
}
MakePaymentComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'flutterwave-make-payment',
                template: `
    <button
      style="{{style}}"
      [ngClass]="className ? className : 'flutterwave-pay-button' "
      (click)="makePayment()">
      {{text || 'Pay'}}
    </button>
  `,
                styles: [`
    .flutterwave-pay-button{
      background-color: #f5a623;
      border-radius: 4px;
      border-color: #f5a623;
      -webkit-box-shadow: 0 2px 3px 0 #ccc;
              box-shadow: 0 2px 3px 0 #ccc;
      color: #fff;
      display: block;
      font-size: 12px;
      font-weight: 700;
      padding: 14px 22px;
      text-align: center;
      text-decoration: none;
      -webkit-transition: all .3s ease-in-out;
      transition: all .3s ease-in-out;

    }
  `]
            },] },
];
/**
 * @nocollapse
 */
MakePaymentComponent.ctorParameters = () => [];
MakePaymentComponent.propDecorators = {
    'public_key': [{ type: Input },],
    'tx_ref': [{ type: Input },],
    'amount': [{ type: Input },],
    'currency': [{ type: Input },],
    'payment_options': [{ type: Input },],
    'redirect_url': [{ type: Input },],
    'meta': [{ type: Input },],
    'customer': [{ type: Input },],
    'callback': [{ type: Output },],
    'close': [{ type: Output },],
    'customizations': [{ type: Input },],
    'text': [{ type: Input },],
    'style': [{ type: Input },],
    'className': [{ type: Input },],
    'data': [{ type: Input },],
};

class Flutterwave {
    constructor() { }
    /**
     * @param {?} paymentData
     * @return {?}
     */
    inlinePay(paymentData) {
        const /** @type {?} */ data = Object.assign({}, paymentData, { callback: response => {
                paymentData.callbackContext[paymentData.callback.name](response);
            }, onclose: () => {
                try {
                    paymentData.callbackContext[paymentData.onclose.name]();
                }
                catch (e) { }
            } });
        FlutterwaveCheckout(data);
    }
    /**
     * @param {?} paymentData
     * @return {?}
     */
    asyncInlinePay(paymentData) {
        return new Promise((resolve, reject) => {
            paymentData = Object.assign({}, paymentData, { callback: ($event) => {
                    resolve($event);
                }, onclose: () => resolve('closed') });
            FlutterwaveCheckout(paymentData);
        });
    }
    /**
     *
     * @param {?=} waitDuration {Number} Seconds before closing payment modal
     * @return {?}
     */
    closePaymentModal(waitDuration = 0) {
        setTimeout(() => {
            document.getElementsByName('checkout')[0].setAttribute('style', 'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
            document.body.style.overflow = '';
            // document.getElementsByName('checkout')[0].setAttribute('style', 'z-index: -1; opacity: 0')
        }, waitDuration * 1000);
    }
}
Flutterwave.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Flutterwave.ctorParameters = () => [];

class FlutterwaveModule {
    constructor() {
        const inlineSdk = 'https://checkout.flutterwave.com/v3.js';
        const script = document.createElement('script');
        script.src = inlineSdk;
        if (!document.querySelector(`[src="${inlineSdk}"]`)) {
            document.body.appendChild(script);
        }
    }
}
FlutterwaveModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [MakePaymentComponent],
                providers: [Flutterwave],
                exports: [MakePaymentComponent]
            },] },
];
/**
 * @nocollapse
 */
FlutterwaveModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { FlutterwaveModule, Flutterwave, InlinePaymentOptions, PaymentSuccessResponse, AsyncPaymentOptions, MakePaymentComponent };
//# sourceMappingURL=flutterwave-angular-v3.js.map
