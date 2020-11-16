import { EventEmitter, OnInit } from '@angular/core';
import { InlinePaymentOptions, PaymentSuccessResponse } from '../models';
import { Flutterwave } from '../flutterwave.service';
export declare class MakePaymentComponent implements OnInit {
    private flutterwave;
    public_key: string;
    tx_ref: string;
    amount: number;
    currency: string;
    payment_options: string;
    payment_plan: string | number;
    subaccounts: any;
    integrity_hash: any;
    redirect_url: string;
    meta: object;
    customer: object;
    callback: EventEmitter<PaymentSuccessResponse>;
    close: EventEmitter<any>;
    customizations: object;
    text: string;
    style: any;
    className: string;
    data: InlinePaymentOptions;
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
    constructor(flutterwave: Flutterwave);
    ngOnInit(): void;
    makePayment(): void;
    prepareForPayment(): void;
}
