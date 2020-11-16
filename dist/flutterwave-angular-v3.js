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
 * \@property payment_plan {String}
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
 * \@property payment_plan {String}
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
 * \@property payment_plan {String}
 */
class PaymentSuccessResponse {
}

class ApiTracking {
    constructor() {
        this.trackingEndPoint = 'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent';
        this.packageVersion = '1.2.1';
        this.language = 'Angular V3';
    }
    /**
     * @param {?} data
     * @return {?}
     */
    track(data) {
        const /** @type {?} */ trackingData = {
            publicKey: data.paymentData.public_key,
            language: this.language,
            version: this.packageVersion,
            title: '',
            message: '0' // data.responseTime
        };
        const /** @type {?} */ paymentOptions = data.paymentData.payment_options || '';
        const /** @type {?} */ paymentOptionsArray = paymentOptions ? paymentOptions.split(',') : [];
        let /** @type {?} */ title = '';
        if (paymentOptionsArray.length === 0) {
            title = 'Initiate-Charge-Dashboard';
        }
        else if (paymentOptionsArray.length === 1) {
            title = 'Initiate-Charge-' + paymentOptions;
        }
        else {
            title = 'Initiate-Charge-Multiple';
        }
        trackingData.title = data.response.status === 'successful' ? title : title + '-error';
        this.submitTracking(trackingData);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    submitTracking(data) {
        fetch(this.trackingEndPoint, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((res) => {
        });
    }
}
ApiTracking.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ApiTracking.ctorParameters = () => [];

class Flutterwave {
    /**
     * @param {?} tracker
     */
    constructor(tracker) {
        this.tracker = tracker;
    }
    /**
     * @param {?} paymentData
     * @return {?}
     */
    inlinePay(paymentData) {
        const /** @type {?} */ data = Object.assign({}, paymentData, { callback: response => {
                this.submitToTracker(paymentData, response, 10000);
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
                    this.submitToTracker(paymentData, $event, 10000);
                    resolve($event);
                }, onclose: () => resolve('closed') });
            FlutterwaveCheckout(paymentData);
        });
    }
    /**
     * @param {?} paymentData
     * @param {?} response
     * @param {?} responseTime
     * @return {?}
     */
    submitToTracker(paymentData, response, responseTime) {
        this.tracker.track({
            paymentData,
            response,
            responseTime
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
Flutterwave.ctorParameters = () => [
    { type: ApiTracking, },
];

class MakePaymentComponent {
    /**
     * @param {?} flutterwave
     */
    constructor(flutterwave) {
        this.flutterwave = flutterwave;
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
                    this.flutterwave.submitToTracker(this.data, response, 10000);
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
                    this.flutterwave.submitToTracker(this.inlinePaymentOptions, response, 10000);
                    this.callback.emit(response);
                },
                onclose: () => this.close.emit(),
                customizations: Object.assign({}, this.customizations_defaults, this.customizations)
            };
            if (this.payment_plan) {
                this.inlinePaymentOptions.payment_plan = this.payment_plan;
            }
            if (this.subaccounts) {
                this.inlinePaymentOptions.subaccounts = this.subaccounts;
            }
            if (this.integrity_hash) {
                this.inlinePaymentOptions.integrity_hash = this.integrity_hash;
            }
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
MakePaymentComponent.ctorParameters = () => [
    { type: Flutterwave, },
];
MakePaymentComponent.propDecorators = {
    'public_key': [{ type: Input },],
    'tx_ref': [{ type: Input },],
    'amount': [{ type: Input },],
    'currency': [{ type: Input },],
    'payment_options': [{ type: Input },],
    'payment_plan': [{ type: Input },],
    'subaccounts': [{ type: Input },],
    'integrity_hash': [{ type: Input },],
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
                    CommonModule,
                ],
                declarations: [MakePaymentComponent],
                providers: [Flutterwave, ApiTracking],
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

export { FlutterwaveModule, Flutterwave, InlinePaymentOptions, PaymentSuccessResponse, AsyncPaymentOptions, MakePaymentComponent, ApiTracking as ɵa };
//# sourceMappingURL=flutterwave-angular-v3.js.map
