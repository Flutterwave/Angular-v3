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
 * \@property payment_plan {String}
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
 * \@property payment_plan {String}
 */
var PaymentSuccessResponse = (function () {
    function PaymentSuccessResponse() {
    }
    return PaymentSuccessResponse;
}());
var ApiTracking = (function () {
    function ApiTracking() {
        this.trackingEndPoint = 'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent';
        this.packageVersion = '1.2.1';
        this.language = 'Angular V3';
    }
    /**
     * @param {?} data
     * @return {?}
     */
    ApiTracking.prototype.track = function (data) {
        var /** @type {?} */ trackingData = {
            publicKey: data.paymentData.public_key,
            language: this.language,
            version: this.packageVersion,
            title: '',
            message: '0' // data.responseTime
        };
        var /** @type {?} */ paymentOptions = data.paymentData.payment_options || '';
        var /** @type {?} */ paymentOptionsArray = paymentOptions ? paymentOptions.split(',') : [];
        var /** @type {?} */ title = '';
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
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ApiTracking.prototype.submitTracking = function (data) {
        fetch(this.trackingEndPoint, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(function (res) {
        });
    };
    return ApiTracking;
}());
ApiTracking.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ApiTracking.ctorParameters = function () { return []; };
var Flutterwave = (function () {
    /**
     * @param {?} tracker
     */
    function Flutterwave(tracker) {
        this.tracker = tracker;
    }
    /**
     * @param {?} paymentData
     * @return {?}
     */
    Flutterwave.prototype.inlinePay = function (paymentData) {
        var _this = this;
        var /** @type {?} */ data = Object.assign({}, paymentData, { callback: function (response) {
                _this.submitToTracker(paymentData, response, 10000);
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
        var _this = this;
        return new Promise(function (resolve, reject) {
            paymentData = Object.assign({}, paymentData, { callback: function ($event) {
                    _this.submitToTracker(paymentData, $event, 10000);
                    resolve($event);
                }, onclose: function () { return resolve('closed'); } });
            FlutterwaveCheckout(paymentData);
        });
    };
    /**
     * @param {?} paymentData
     * @param {?} response
     * @param {?} responseTime
     * @return {?}
     */
    Flutterwave.prototype.submitToTracker = function (paymentData, response, responseTime) {
        this.tracker.track({
            paymentData: paymentData,
            response: response,
            responseTime: responseTime
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
            document.getElementsByName('checkout')[0].setAttribute('style', 'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
            document.body.style.overflow = '';
            // document.getElementsByName('checkout')[0].setAttribute('style', 'z-index: -1; opacity: 0')
        }, waitDuration * 1000);
    };
    return Flutterwave;
}());
Flutterwave.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Flutterwave.ctorParameters = function () { return [
    { type: ApiTracking, },
]; };
var MakePaymentComponent = (function () {
    /**
     * @param {?} flutterwave
     */
    function MakePaymentComponent(flutterwave) {
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
                    _this.flutterwave.submitToTracker(_this.data, response, 10000);
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
                    _this.flutterwave.submitToTracker(_this.inlinePaymentOptions, response, 10000);
                    _this.callback.emit(response);
                },
                onclose: function () { return _this.close.emit(); },
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
    };
    return MakePaymentComponent;
}());
MakePaymentComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'flutterwave-make-payment',
                template: "\n    <button\n      style=\"{{style}}\"\n      [ngClass]=\"className ? className : 'flutterwave-pay-button' \"\n      (click)=\"makePayment()\">\n      {{text || 'Pay'}}\n    </button>\n  ",
                styles: ["\n    .flutterwave-pay-button{\n      background-color: #f5a623;\n      border-radius: 4px;\n      border-color: #f5a623;\n      -webkit-box-shadow: 0 2px 3px 0 #ccc;\n              box-shadow: 0 2px 3px 0 #ccc;\n      color: #fff;\n      display: block;\n      font-size: 12px;\n      font-weight: 700;\n      padding: 14px 22px;\n      text-align: center;\n      text-decoration: none;\n      -webkit-transition: all .3s ease-in-out;\n      transition: all .3s ease-in-out;\n\n    }\n  "]
            },] },
];
/**
 * @nocollapse
 */
MakePaymentComponent.ctorParameters = function () { return [
    { type: Flutterwave, },
]; };
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
FlutterwaveModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { FlutterwaveModule, Flutterwave, InlinePaymentOptions, PaymentSuccessResponse, AsyncPaymentOptions, MakePaymentComponent, ApiTracking as ɵa };
//# sourceMappingURL=flutterwave-angular-v3.es5.js.map
