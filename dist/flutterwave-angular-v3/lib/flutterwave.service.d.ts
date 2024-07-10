/// <reference path="../../../projects/flutterwave-angular-v3/src/index.d.ts" />
import { AsyncPaymentOptions, InlinePaymentOptions, PaymentSuccessResponse } from './models';
import { ApiTrackingService } from './api-tracking.service';
import * as i0 from "@angular/core";
export declare class FlutterwaveService {
    private tracker;
    constructor(tracker: ApiTrackingService);
    inlinePay(paymentData: InlinePaymentOptions): void;
    asyncInlinePay(paymentData: AsyncPaymentOptions): Promise<PaymentSuccessResponse | 'closed'>;
    submitToTracker(paymentData: any, response: any, responseTime: any): void;
    /**
     *
     * @param waitDuration {Number} Seconds before closing payment modal
     */
    closePaymentModal(waitDuration?: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlutterwaveService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FlutterwaveService>;
}
