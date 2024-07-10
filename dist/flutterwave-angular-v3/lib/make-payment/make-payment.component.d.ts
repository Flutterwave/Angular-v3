import { EventEmitter } from '@angular/core';
import { FlutterwaveService } from '../flutterwave.service';
import { InlinePaymentOptions, PaymentSuccessResponse } from '../models';
import * as i0 from "@angular/core";
export declare class MakePaymentComponent {
    private flutterwaveService;
    public_key: string;
    tx_ref: string;
    amount: number;
    currency?: string;
    payment_options?: string;
    payment_plan?: string | number;
    subaccounts: any;
    integrity_hash: any;
    redirect_url?: string;
    meta?: object;
    customer?: object;
    callback: EventEmitter<PaymentSuccessResponse>;
    close: EventEmitter<any>;
    customizations?: object;
    text?: string;
    style: any;
    className?: string;
    data?: InlinePaymentOptions;
    private inlinePaymentOptions;
    customer_defaults: {
        email: string;
        phone_number: string;
        name: string;
    };
    meta_defaults: {
        consumer_id: string;
        consumer_mac: string;
    };
    customizations_defaults: {
        title: string;
        description: string;
        logo: string;
    };
    constructor(flutterwaveService: FlutterwaveService);
    ngOnInit(): void;
    makePayment(): void;
    prepareForPayment(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MakePaymentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MakePaymentComponent, "flutterwave-make-payment", never, { "public_key": { "alias": "public_key"; "required": false; }; "tx_ref": { "alias": "tx_ref"; "required": false; }; "amount": { "alias": "amount"; "required": false; }; "currency": { "alias": "currency"; "required": false; }; "payment_options": { "alias": "payment_options"; "required": false; }; "payment_plan": { "alias": "payment_plan"; "required": false; }; "subaccounts": { "alias": "subaccounts"; "required": false; }; "integrity_hash": { "alias": "integrity_hash"; "required": false; }; "redirect_url": { "alias": "redirect_url"; "required": false; }; "meta": { "alias": "meta"; "required": false; }; "customer": { "alias": "customer"; "required": false; }; "customizations": { "alias": "customizations"; "required": false; }; "text": { "alias": "text"; "required": false; }; "style": { "alias": "style"; "required": false; }; "className": { "alias": "className"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, { "callback": "callback"; "close": "close"; }, never, never, true, never>;
}
