import * as i0 from '@angular/core';
import { Injectable, NgModule, EventEmitter, Component, Input, Output } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class ApiTrackingService {
    /*  trackingFeatures = {
        'initiateCardCharge': 'Initiate-Card-charge',
        'initiateCardChargeError': 'Initiate-Card-charge-error',
        'validateCardCharge': 'Validate-Card-charge',
        'validateCardChargeError': 'Validate-Card-charge-error',
        'verifyCardCharge': 'Verify-Card-charge',
        'verifyCardChargeError': 'Verify-Card-charge-error',
        'initiateAccountCharge': 'Initiate-Account-charge',
        'initiateAccountChargeError': 'Initiate-Account-charge-error',
        'accountChargeValidate': 'Account-charge-validate',
        'accountChargeValidateError': 'Account-charge-validate-error',
        'accountChargeVerify': 'Account-charge-verify',
        'accountChargeVerifyError': 'Account-charge-verify-error',
      }*/
    constructor() {
        this.trackingEndPoint = 'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent';
        this.packageVersion = '1.2.1';
        this.language = 'Angular V3';
    }
    track(data) {
        const trackingData = {
            publicKey: data.paymentData.public_key,
            language: this.language,
            version: this.packageVersion,
            title: '',
            message: '0' // data.responseTime
        };
        const paymentOptions = data.paymentData.payment_options || '';
        const paymentOptionsArray = paymentOptions ? paymentOptions.split(',') : [];
        let title = '';
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
    submitTracking(data) {
        fetch(this.trackingEndPoint, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((res) => {
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ApiTrackingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ApiTrackingService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ApiTrackingService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });

// This reference is necessary to ensure TypeScript recognizes the global FlutterwaveCheckout function.
/// <reference path="../index.d.ts" />
class FlutterwaveService {
    constructor(tracker) {
        this.tracker = tracker;
    }
    inlinePay(paymentData) {
        const data = {
            ...paymentData,
            callback: (response) => {
                this.submitToTracker(paymentData, response, 10000);
                if (paymentData.callbackContext && paymentData.callback) {
                    paymentData.callbackContext[paymentData.callback.name](response);
                }
            },
            onclose: () => {
                try {
                    if (paymentData.callbackContext && paymentData.onclose) {
                        paymentData.callbackContext[paymentData.onclose.name]();
                    }
                }
                catch (e) { }
            }
        };
        if (window.FlutterwaveCheckout) {
            window.FlutterwaveCheckout(data);
        }
        else {
            console.error('FlutterwaveCheckout is not defined');
        }
    }
    asyncInlinePay(paymentData) {
        return new Promise((resolve, reject) => {
            paymentData = {
                ...paymentData,
                callback: ($event) => {
                    this.submitToTracker(paymentData, $event, 10000);
                    resolve($event);
                },
                onclose: () => resolve('closed')
            };
            if (window.FlutterwaveCheckout) {
                window.FlutterwaveCheckout(paymentData);
            }
            else {
                console.error('FlutterwaveCheckout is not defined');
            }
        });
    }
    submitToTracker(paymentData, response, responseTime) {
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
    closePaymentModal(waitDuration = 0) {
        setTimeout(() => {
            document.getElementsByName('checkout')[0].setAttribute('style', 'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
            document.body.style.overflow = '';
            // document.getElementsByName('checkout')[0].setAttribute('style', 'z-index: -1; opacity: 0')
        }, waitDuration * 1000);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveService, deps: [{ token: ApiTrackingService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: ApiTrackingService }] });

class FlutterwaveModule {
    constructor() {
        const inlineSdk = 'https://checkout.flutterwave.com/v3.js';
        const script = document.createElement('script');
        script.src = inlineSdk;
        if (!document.querySelector(`[src="${inlineSdk}"]`)) {
            document.body.appendChild(script);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveModule, imports: [CommonModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveModule, providers: [FlutterwaveService, ApiTrackingService], imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    providers: [FlutterwaveService, ApiTrackingService],
                    imports: [
                        CommonModule
                    ]
                }]
        }], ctorParameters: () => [] });

class MakePaymentComponent {
    constructor(flutterwaveService) {
        this.flutterwaveService = flutterwaveService;
        this.callback = new EventEmitter();
        this.close = new EventEmitter();
        this.customer_defaults = {
            email: '',
            phone_number: '',
            name: ''
        };
        this.meta_defaults = {
            consumer_id: '',
            consumer_mac: ''
        };
        this.customizations_defaults = {
            title: '',
            description: '',
            logo: ''
        };
        const inlineSdk = 'https://checkout.flutterwave.com/v3.js';
        const script = document.createElement('script');
        script.src = inlineSdk;
        if (!document.querySelector(`[src="${inlineSdk}"]`)) {
            document.body.appendChild(script);
        }
    }
    ngOnInit() {
    }
    makePayment() {
        this.prepareForPayment();
        if (window.FlutterwaveCheckout) {
            window.FlutterwaveCheckout(this.inlinePaymentOptions);
        }
        else {
            console.error('FlutterwaveCheckout is not defined');
        }
    }
    prepareForPayment() {
        this.customer = this.customer || {};
        this.meta = this.meta || {};
        this.customizations = this.customizations || {};
        if (this.data) {
            this.inlinePaymentOptions = {
                ...this.data,
                callback: response => {
                    this.flutterwaveService.submitToTracker(this.data, response, 10000);
                    if (this.data?.callbackContext && this.data.callback) {
                        this.data.callbackContext[this.data.callback.name](response);
                    }
                },
                onclose: () => {
                    try {
                        if (this.data?.callbackContext && this.data.onclose) {
                            this.data.callbackContext[this.data.onclose.name]();
                        }
                    }
                    catch (e) {
                    }
                },
            };
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
                meta: { ...this.meta_defaults, ...this.meta },
                customer: { ...this.customer_defaults, ...this.customer },
                callback: (response) => {
                    this.flutterwaveService.submitToTracker(this.inlinePaymentOptions, response, 10000);
                    this.callback.emit(response);
                },
                onclose: () => this.close.emit(),
                customizations: {
                    ...this.customizations_defaults,
                    ...this.customizations
                }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: MakePaymentComponent, deps: [{ token: FlutterwaveService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.6", type: MakePaymentComponent, isStandalone: true, selector: "flutterwave-make-payment", inputs: { public_key: "public_key", tx_ref: "tx_ref", amount: "amount", currency: "currency", payment_options: "payment_options", payment_plan: "payment_plan", subaccounts: "subaccounts", integrity_hash: "integrity_hash", redirect_url: "redirect_url", meta: "meta", customer: "customer", customizations: "customizations", text: "text", style: "style", className: "className", data: "data" }, outputs: { callback: "callback", close: "close" }, providers: [FlutterwaveService, ApiTrackingService], ngImport: i0, template: "<button\n  [ngStyle]=\"style\"\n  [ngClass]=\"className ? className : 'flutterwave-pay-button'\"\n  (click)=\"makePayment()\">\n  {{text || 'Pay'}}\n</button>\n", styles: [".flutterwave-pay-button{background-color:#f5a623;border-radius:4px;border-color:#f5a623;box-shadow:0 2px 3px #ccc;color:#fff;display:block;font-size:12px;font-weight:700;padding:14px 22px;text-align:center;text-decoration:none;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: MakePaymentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'flutterwave-make-payment', standalone: true, providers: [FlutterwaveService, ApiTrackingService], imports: [
                        CommonModule
                    ], template: "<button\n  [ngStyle]=\"style\"\n  [ngClass]=\"className ? className : 'flutterwave-pay-button'\"\n  (click)=\"makePayment()\">\n  {{text || 'Pay'}}\n</button>\n", styles: [".flutterwave-pay-button{background-color:#f5a623;border-radius:4px;border-color:#f5a623;box-shadow:0 2px 3px #ccc;color:#fff;display:block;font-size:12px;font-weight:700;padding:14px 22px;text-align:center;text-decoration:none;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}\n"] }]
        }], ctorParameters: () => [{ type: FlutterwaveService }], propDecorators: { public_key: [{
                type: Input
            }], tx_ref: [{
                type: Input
            }], amount: [{
                type: Input
            }], currency: [{
                type: Input
            }], payment_options: [{
                type: Input
            }], payment_plan: [{
                type: Input
            }], subaccounts: [{
                type: Input
            }], integrity_hash: [{
                type: Input
            }], redirect_url: [{
                type: Input
            }], meta: [{
                type: Input
            }], customer: [{
                type: Input
            }], callback: [{
                type: Output
            }], close: [{
                type: Output
            }], customizations: [{
                type: Input
            }], text: [{
                type: Input
            }], style: [{
                type: Input
            }], className: [{
                type: Input
            }], data: [{
                type: Input
            }] } });

/*
 * Public API Surface of flutterwave
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FlutterwaveModule, FlutterwaveService, MakePaymentComponent };
//# sourceMappingURL=flutterwave-angular-v3.mjs.map
