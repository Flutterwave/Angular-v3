import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlutterwaveCheckout, InlinePaymentOptions, PaymentSuccessResponse} from '../models';

@Component({
  // tslint:disable-next-line:component-selector
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
  @Input() payment_plan: string | number;
  @Input() subaccounts: any;
  @Input() integrity_hash: any;
  @Input() redirect_url: string;
  @Input() meta: object; // { counsumer_id, consumer_mac}
  @Input() customer: object; // {email, phone_number,name}
  @Output() callback: EventEmitter<PaymentSuccessResponse> = new EventEmitter<PaymentSuccessResponse>();
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() customizations: object; // {title, description, logo}
  @Input() text: string;
  @Input() style: any;
  @Input() className: string;
  @Input() data: InlinePaymentOptions;

  private inlinePaymentOptions: InlinePaymentOptions;

  customer_defaults = {
    email: '',
    phone_number: '',
    name: '',
  };
  meta_defaults = {
    consumer_id: '',
    consumer_mac: '',
  };
  customizations_defaults = {
    title: '',
    description: '',
    logo: '',
  };


  constructor() {
  }

  ngOnInit(): void {
  }

  makePayment() {

    this.prepareForPayment();
    FlutterwaveCheckout(this.inlinePaymentOptions);

  }

  prepareForPayment(): void {

    this.customer = this.customer || {};
    this.meta = this.meta || {};
    this.customizations = this.customizations || {};

    if ( this.data ) {
      this.inlinePaymentOptions = {
        ...this.data,
        callback: response => {
        this.data.callbackContext[this.data.callback.name](response)
      } ,
        onclose: () => {
          try {
            this.data.callbackContext[this.data.onclose.name]()
          } catch (e) {

          }

        } ,

      }
    } else {

      this.inlinePaymentOptions = {
        callbackContext: null,
        public_key: this.public_key,
        tx_ref: this.tx_ref,
        amount: this.amount,
        currency: this.currency || 'NGN',
        payment_options: this.payment_options || 'card, mobilemoney, ussd',
        redirect_url: this.redirect_url || '',
        meta: {...this.meta_defaults, ...this.meta},
        customer: {...this.customer_defaults, ...this.customer},
        callback: (response: PaymentSuccessResponse) => {
          this.callback.emit(response)
        },
        onclose: () => this.close.emit(),
        customizations: {...this.customizations_defaults
          , ...this.customizations}
      }
      if (this.payment_plan) {
        this.inlinePaymentOptions.payment_plan = this.payment_plan
      }
      if (this.subaccounts) {
        this.inlinePaymentOptions.subaccounts = this.subaccounts
      }
      if (this.integrity_hash) {
        this.inlinePaymentOptions.integrity_hash = this.integrity_hash
      }
    }


  }

}
