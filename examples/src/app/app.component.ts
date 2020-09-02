import {Component, OnInit} from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  publicKey = "FLWPUBK_TEST-0b04581c8d73fd08d5c720e1e0f803b4-X";

  customerDetails = {
    name: 'Demo Customer  Name',
    email: 'customer@mail.com',
    phone_number: '08184500044'
  }

  customizations = {
    title: 'Customization Title',
    description: 'Customization Description',
    logo: 'https://flutterwave.com/images/logo-colored.svg'
  }

  meta = {
    'counsumer_id': '7898',
    'consumer_mac': 'kjs9s8ss7dd'
  }

  paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: 'NGN',
    payment_options: 'card,ussd',
    redirect_url: 'https://flutterwave.com',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,

    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal
  }


  constructor(private flutterwave: Flutterwave) {


  }

  ngOnInit(){

  }



  payViaService() {

    this.flutterwave.inlinePay(this.paymentData)

  }


  makePaymentCallback(response: PaymentSuccessResponse): void {

    console.log("Pay", response);

  }


  closedPaymentModal(): void {
    console.log('payment is closed');
  }


  generateReference(): string {

    let date = new Date()
    return date.getTime().toString();

  }


}
