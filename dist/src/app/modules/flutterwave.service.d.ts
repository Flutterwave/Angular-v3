import { AsyncPaymentOptions, InlinePaymentOptions, PaymentSuccessResponse } from './models';
import { ApiTracking } from './api-tracking.service';
export declare class Flutterwave {
    private tracker;
    constructor(tracker: ApiTracking);
    inlinePay(paymentData: InlinePaymentOptions): void;
    asyncInlinePay(paymentData: AsyncPaymentOptions): Promise<PaymentSuccessResponse | 'closed'>;
    submitToTracker(paymentData: any, response: any, responseTime: any): void;
    /**
     *
     * @param waitDuration {Number} Seconds before closing payment modal
     */
    closePaymentModal(waitDuration?: number): void;
}
