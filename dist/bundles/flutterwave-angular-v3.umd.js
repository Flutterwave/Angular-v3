(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['flutterwave-angular-v3'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

var InlinePaymentOptions = (function () {
    function InlinePaymentOptions() {
    }
    return InlinePaymentOptions;
}());
var PaymentSuccessResponse = (function () {
    function PaymentSuccessResponse() {
    }
    return PaymentSuccessResponse;
}());
var MakePaymentComponent = (function () {
    function MakePaymentComponent() {
        this.callback = new core.EventEmitter();
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
        this.close = new core.EventEmitter();
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
    MakePaymentComponent.prototype.ngOnInit = function () {
    };
    /**
     * @return {?}
     */
    MakePaymentComponent.prototype.makePayment = function () {
        this.prepareForPayment();
        FlutterwaveCheckout(this.inlinePaymentOptions);
    };
    /**
     * @return {?}
     */
    MakePaymentComponent.prototype.prepareForPayment = function () {
        var _this = this;
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
            callback: function (response) { return _this.callback.emit(response); },
            onclose: function () { return _this.close.emit(); },
            customizations: Object.assign({}, this.customer_defaults, this.customizations)
        };
    };
    return MakePaymentComponent;
}());
MakePaymentComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'flutterwave-make-payment',
                template: "\n    <button\n\n      style=\"{{style}}\"\n      [ngClass]=\"className ? className : 'flutterwave-pay-button' \"\n      (click)=\"makePayment()\">\n      {{text || 'Pay'}}\n    </button>\n  ",
                styles: ["\n    .flutterwave-pay-button{\n      background-color: #f5a623;\n      border-radius: 4px;\n      border-color: #f5a623;\n      -webkit-box-shadow: 0 2px 3px 0 #ccc;\n              box-shadow: 0 2px 3px 0 #ccc;\n      color: #fff;\n      display: block;\n      font-size: 12px;\n      font-weight: 700;\n      padding: 14px 22px;\n      text-align: center;\n      text-decoration: none;\n      -webkit-transition: all .3s ease-in-out;\n      transition: all .3s ease-in-out;\n\n    }\n  "]
            },] },
];
/**
 * @nocollapse
 */
MakePaymentComponent.ctorParameters = function () { return []; };
MakePaymentComponent.propDecorators = {
    'public_key': [{ type: core.Input },],
    'tx_ref': [{ type: core.Input },],
    'amount': [{ type: core.Input },],
    'currency': [{ type: core.Input },],
    'payment_options': [{ type: core.Input },],
    'redirect_url': [{ type: core.Input },],
    'meta': [{ type: core.Input },],
    'customer': [{ type: core.Input },],
    'callback': [{ type: core.Output },],
    'close': [{ type: core.Output },],
    'customizations': [{ type: core.Input },],
    'text': [{ type: core.Input },],
    'style': [{ type: core.Input },],
    'className': [{ type: core.Input },],
    'data': [{ type: core.Input },],
};
var Flutterwave = (function () {
    function Flutterwave() {
    }
    /**
     * @param {?} paymentData
     * @return {?}
     */
    Flutterwave.prototype.inlinePay = function (paymentData) {
        FlutterwaveCheckout(paymentData);
    };
    return Flutterwave;
}());
Flutterwave.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
Flutterwave.ctorParameters = function () { return []; };
var FlutterwaveModule = (function () {
    function FlutterwaveModule() {
    }
    return FlutterwaveModule;
}());
FlutterwaveModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                declarations: [MakePaymentComponent],
                providers: [Flutterwave],
                exports: [MakePaymentComponent]
            },] },
];
/**
 * @nocollapse
 */
FlutterwaveModule.ctorParameters = function () { return []; };

exports.FlutterwaveModule = FlutterwaveModule;
exports.Flutterwave = Flutterwave;
exports.InlinePaymentOptions = InlinePaymentOptions;
exports.PaymentSuccessResponse = PaymentSuccessResponse;
exports.MakePaymentComponent = MakePaymentComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=flutterwave-angular-v3.umd.js.map
