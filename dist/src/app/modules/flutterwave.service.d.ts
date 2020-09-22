import { AsyncPaymentOptions, InlinePaymentOptions, PaymentSuccessResponse } from './models';
export declare class Flutterwave {
    constructor();
    inlinePay(paymentData: InlinePaymentOptions): void;
    asyncInlinePay(paymentData: AsyncPaymentOptions): Promise<PaymentSuccessResponse | 'closed'>;
    /**
     *
     * @param waitDuration {Number} Seconds before closing payment modal
     */
    closePaymentModal(waitDuration?: number): void;
}
