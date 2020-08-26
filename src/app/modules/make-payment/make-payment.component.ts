import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlutterwaveCheckout, InlinePaymentOptions, PaymentSuccessResponse} from '../models';

@Component({
  selector: 'flutterwave-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  @Input() public_key: string;
  @Input() tx_ref: string;
  @Input() amount: number;
  @Input() currency: string;
  @Input() payment_options: string;
  @Input() redirect_url: string;
  @Input() meta: object; //{ counsumer_id, consumer_mac}
  @Input() customer: object; //{email, phone_number,name}
  @Output() callback: EventEmitter<PaymentSuccessResponse> = new EventEmitter<PaymentSuccessResponse>();
  /*
    callBack interface
    amount: 90000
   currency: "NGN"
   customer: {name: "Demo Customer  Name", email: "customer@mail.com", phone_number: "08184505144"}
   flw_ref: "FLW-MOCK-e8fbce1a9441489c03f997a55404ff4d"
   status: "successful"
   transaction_id: 1468479
   tx_ref: "hshbnsfshhs"
   */
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() customizations: object; //{title, description, logo}



  @Input() text: string;
  @Input() style: any;
  @Input() className: string;

  @Input() data: InlinePaymentOptions;



  private inlinePaymentOptions: InlinePaymentOptions

  customer_defaults = {
    email: "",
    phone_number: "",
    name: "",
  }
  meta_defaults = {
    consumer_id: '',
    consumer_mac: '',
  }
  customizations_defaults = {
    title: "",
    description: "",
    logo: "",
  }


  constructor() {
  }

  ngOnInit(): void {
  }

  makePayment() {
    this.prepareForPayment();
    FlutterwaveCheckout(this.inlinePaymentOptions);

  }

  prepareForPayment(): void {
    this.customer = this.customer || {}
    this.meta = this.meta || {}
    this.customizations = this.customizations || {}

    this.inlinePaymentOptions =  this.data ? this.data :  {
      public_key: this.public_key,
      tx_ref: this.tx_ref,
      amount: this.amount,
      currency: this.currency || 'NGN',
      payment_options: this.payment_options || "card, mobilemoney, ussd",
      redirect_url: this.redirect_url || '',
      meta: {...this.meta_defaults, ...this.meta},
      customer: {...this.customer_defaults, ...this.customer},
      callback: (response: PaymentSuccessResponse) => this.callback.emit(response),
      onclose: () => this.close.emit(),
      customizations: {...this.customer_defaults, ...this.customizations}
    }

  }

}
