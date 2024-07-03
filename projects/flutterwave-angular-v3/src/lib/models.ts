interface InlinePaymentOptions  {
  public_key: string;
  callbackContext?: object | null;
  tx_ref: string;
  amount: number;
  currency?: string;
  country?: string;
  authorization?: object | string;
  payment_options?: string;
  payment_plan?: string | number;
  subaccounts?: any;
  integrity_hash?: any;
  redirect_url?: string;
  meta ?: any;
  customer?: object;
  customizations?: object;
  callback?: (response: object) => void;
  onclose?: () => void;
}

interface AsyncPaymentOptions {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency?: string;
  country?: string;
  authorization?: object | string;
  payment_options?: string;
  meta ?: any;
  customer?: object;
  customizations?: object;
  payment_plan?: string | number;
  subaccounts?: any;
  integrity_hash?: any;
  callback?: (response: object) => void;
  onclose?: () => void;
}

interface PaymentSuccessResponse {
  amount?: number;
  currency?: string;
  customer?: object;
  flw_ref?: string;
  status?: string;
  transaction_id?: number;
  tx_ref?: string;
  payment_plan?: string|  number
}

export {
  InlinePaymentOptions,
  AsyncPaymentOptions,
  PaymentSuccessResponse
}
