/**
 * Payment data object
 * @typedef {Object}
 * @property public_key {String}
 * @property callbackContext {Object}  The context of the
 * component or service that has the callback method.
 * The value must always be 'this'.
 * Using any other value might lead to error.
 * @property tx_ref {String}
 * @property amount {Number}
 * @property currency {String}
 * @property payment_options {String}
 * @property redirect_url {String}
 * @property meta {Object}
 * @property customer {Object}
 * @property customizations {Object}
 * @property callback {Function}
 * @property onclose {Function}
 */
declare class InlinePaymentOptions {
    public_key: string;
    callbackContext?: object;
    tx_ref: string;
    amount: number;
    currency?: string;
    country?: string;
    authorization?: object | string;
    payment_options?: string;
    redirect_url?: string;
    meta?: any;
    customer?: object;
    customizations?: object;
    callback?: (response: object) => void;
    onclose?: () => void;
}
/**
 * Async Payment data object
 * @typedef {Object}
 * @property public_key {String}
 * @property tx_ref {String}
 * @property amount {Number}
 * @property currency {String}
 * @property payment_options {String}
 * @property meta {Object}
 * @property customer {Object}
 * @property customizations {Object}
 */
declare class AsyncPaymentOptions {
    public_key: string;
    tx_ref: string;
    amount: number;
    currency?: string;
    country?: string;
    authorization?: object | string;
    payment_options?: string;
    meta?: any;
    customer?: object;
    customizations?: object;
}
declare function FlutterwaveCheckout(any: any): any;
/**
 * Payment Response
 * @typedef {Object}
 * @property amount {String}
 * @property currency {Number}
 * @property customer {Object}
 * @property flw_ref {String}
 * @property status {String}
 * @property transaction_id {String}
 * @property tx_ref {String}
 */
declare class PaymentSuccessResponse {
    amount?: number;
    currency?: string;
    customer?: object;
    flw_ref?: string;
    status?: string;
    transaction_id?: number;
    tx_ref?: string;
}
export { InlinePaymentOptions, AsyncPaymentOptions, FlutterwaveCheckout, PaymentSuccessResponse };
