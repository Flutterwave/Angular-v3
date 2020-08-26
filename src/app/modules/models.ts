

  class  InlinePaymentOptions {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency?: string;
  payment_options?: string
  redirect_url?: string;
  meta ?: any;
  customer : object
  callback: (response: object) => void;
  onclose?: () => void;
  customizations?: object
}

  declare function  FlutterwaveCheckout(any)


 class  PaymentSuccessResponse{
    amount: number
    currency: string
    customer: object
    flw_ref: string
    status: string
    transaction_id: number
    tx_ref: string
  }

  export {
    InlinePaymentOptions,
    FlutterwaveCheckout,
    PaymentSuccessResponse
  }
