import { Component, EventEmitter, Injectable, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

class InlinePaymentOptions {
}
class PaymentSuccessResponse {
}

class MakePaymentComponent {
    constructor() {
        this.callback = new EventEmitter();
        /*
          callBack interface
          amount: 90000
         currency: "NGN"
         customer: {name: "Demo Customer  Name", email: "customer@mail.com", phone_number: "08184505144"}
         flw_ref: "FLW-MOCK-e8fbce1a9441489c03f997a55404ff4d"
         status: "successful"
         transaction_id: 1468479
         tx_ref: "hshbnsfshhs"
         */
        this.close = new EventEmitter();
        this.customer_defaults = {
            email: "",
            phone_number: "",
            name: "",
        };
        this.meta_defaults = {
            consumer_id: '',
            consumer_mac: '',
        };
        this.customizations_defaults = {
            title: "",
            description: "",
            logo: "",
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
        this.inlinePaymentOptions = this.data ? this.data : {
            public_key: this.public_key,
            tx_ref: this.tx_ref,
            amount: this.amount,
            currency: this.currency || 'NGN',
            payment_options: this.payment_options || "card, mobilemoney, ussd",
            redirect_url: this.redirect_url || '',
            meta: Object.assign({}, this.meta_defaults, this.meta),
            customer: Object.assign({}, this.customer_defaults, this.customer),
            callback: (response) => this.callback.emit(response),
            onclose: () => this.close.emit(),
            customizations: Object.assign({}, this.customer_defaults, this.customizations)
        };
    }
}
MakePaymentComponent.decorators = [
    { type: Component, args: [{
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
        FlutterwaveCheckout(paymentData);
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

export { FlutterwaveModule, Flutterwave, InlinePaymentOptions, PaymentSuccessResponse, MakePaymentComponent };
//# sourceMappingURL=flutterwave-angular-v3.js.map
