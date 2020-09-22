(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['flutterwave-angular-v3'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

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
var InlinePaymentOptions = (function () {
    function InlinePaymentOptions() {
    }
    return InlinePaymentOptions;
}());
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
var AsyncPaymentOptions = (function () {
    function AsyncPaymentOptions() {
    }
    return AsyncPaymentOptions;
}());
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
var PaymentSuccessResponse = (function () {
    function PaymentSuccessResponse() {
    }
    return PaymentSuccessResponse;
}());
var MakePaymentComponent = (function () {
    function MakePaymentComponent() {
        this.callback = new core.EventEmitter();
        this.close = new core.EventEmitter();
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
        if (this.data) {
            this.inlinePaymentOptions = Object.assign({}, this.data, { callback: function (response) {
                    _this.data.callbackContext[_this.data.callback.name](response);
                }, onclose: function () {
                    try {
                        _this.data.callbackContext[_this.data.onclose.name]();
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
                callback: function (response) {
                    _this.callback.emit(response);
                },
                onclose: function () { return _this.close.emit(); },
                customizations: Object.assign({}, this.customizations_defaults, this.customizations)
            };
        }
    };
    return MakePaymentComponent;
}());
MakePaymentComponent.decorators = [
    { type: core.Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'flutterwave-make-payment',
                template: "\n    <button\n      style=\"{{style}}\"\n      [ngClass]=\"className ? className : 'flutterwave-pay-button' \"\n      (click)=\"makePayment()\">\n      {{text || 'Pay'}}\n    </button>\n  ",
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
        var /** @type {?} */ data = Object.assign({}, paymentData, { callback: function (response) {
                paymentData.callbackContext[paymentData.callback.name](response);
            }, onclose: function () {
                try {
                    paymentData.callbackContext[paymentData.onclose.name]();
                }
                catch (e) { }
            } });
        FlutterwaveCheckout(data);
    };
    /**
     * @param {?} paymentData
     * @return {?}
     */
    Flutterwave.prototype.asyncInlinePay = function (paymentData) {
        return new Promise(function (resolve, reject) {
            paymentData = Object.assign({}, paymentData, { callback: function ($event) {
                    resolve($event);
                }, onclose: function () { return resolve('closed'); } });
            FlutterwaveCheckout(paymentData);
        });
    };
    /**
     *
     * @param {?=} waitDuration {Number} Seconds before closing payment modal
     * @return {?}
     */
    Flutterwave.prototype.closePaymentModal = function (waitDuration) {
        if (waitDuration === void 0) { waitDuration = 0; }
        setTimeout(function () {
            document.getElementsByName('checkout')[0].setAttribute('style', 'z-index: -1; opacity: 0');
        }, waitDuration * 1000);
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
        var inlineSdk = 'https://checkout.flutterwave.com/v3.js';
        var script = document.createElement('script');
        script.src = inlineSdk;
        if (!document.querySelector("[src=\"" + inlineSdk + "\"]")) {
            document.body.appendChild(script);
        }
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
exports.AsyncPaymentOptions = AsyncPaymentOptions;
exports.MakePaymentComponent = MakePaymentComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=flutterwave-angular-v3.umd.js.map
