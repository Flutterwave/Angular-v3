## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Running tests](#test)
- [Deployment](#deployment)
- [Built Using](#build-tools)
- [References](#references)

<a id="about"></a>
## About

Flutterwave official  Angular library to accept payment via  card , USSD, QrCode, Mobile Money etc.

<a id="getting-started"></a>

## 🏁 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.
See [references](#references) for links to dashboard and API documentation.


### Prerequisites

```
Node version >= 6.9.x and npm >= 3.x.x
Angular version  >= 4
Flutterwave version 3 API keys

```

### Installing


Install the SDK 

```bash
$ npm install flutterwave-angular-v3
# or
$ yarn  add  flutterwave-angular-v3

```


<a id="usage"></a>

## 🔧 Usage

Import FlutterwaveModule to the  app root module

```typescript
import { FlutterwaveModule } from "flutterwave-angular-v3"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlutterwaveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

Use as component, Method 1 : Pass  in payment parameters individually as component attributes

```typescript
import {Component, OnInit} from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3"
@Component({
  selector: 'app-root',
  template: ` <flutterwave-make-payment
                [public_key]="publicKey"
                amount='10'
                currency='NGN'
                payment_options="card"
                redirect_url=""
                text="Pay Now"
                [customer]="customerDetails"
                [customizations]="customizations"
                [meta]="meta"
                [tx_ref]="generateReference()"
                (callback)="makePaymentCallback($event)"
                (close)="closedPaymentModal()" >
            </flutterwave-make-payment>`
})
export class AppComponent{
  //use your PUBLIC_KEY here
  publicKey = "FLWPUBK_TEST-XXXXX-X";

  customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}

  customizations = {title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'}

  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}

 constructor( private flutterwave: Flutterwave) {}

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5)
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}

```

Use as component, Method 2:  Pass in the payment parameters as an object to the component 'data' attribute

```typescript
import {Component, OnInit} from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3"

@Component({
  selector: 'app-root',
  template: ` <flutterwave-make-payment  [data]="paymentData" ></flutterwave-make-payment>`
})
export class AppComponent{
  publicKey = "FLWPUBK_TEST-0b0-XXXXXXXXXXX";


 customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}

  customizations = {title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'}

  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}


  paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: 'NGN',
    payment_options: 'card,ussd',
    redirect_url: '',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  }
  
  constructor( private flutterwave: Flutterwave) {}
 makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5)
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
  
}
```

Use in Code, Method 1 : Using the Flutterwave service.

```typescript
import { Component } from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3";

@Component({
  selector: 'app-root',
  template: `<button (click)="makePayment()">Pay</button>`,
})
export class AppComponent {

 publicKey = "FLWPUBK_TEST-XXXXXXXXX";

  customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}

  customizations = {title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'}

  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}

 paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: 'NGN',
    payment_options: 'card,ussd',
    redirect_url: '',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  }
  //Inject the flutterwave service 
  constructor(private flutterwave: Flutterwave ) {
  }
  makePayment(){
    this.flutterwave.inlinePay(this.paymentData)
  }
  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Payment callback", response);
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }
}

```


Use in Code, Method 2 (Promise): Async Payment Response.

```typescript
import {Component} from '@angular/core';
import {Flutterwave, AsyncPaymentOptions} from "flutterwave-angular-v3"

@Component({
  selector: 'app-root',
  template: ` <button (click)="payViaPromise()" >Pay via Promise </button>`
})
export class AppComponent{

  publicKey = "FLWPUBK_TEST-XXXXXXXXX";

  customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}

  customizations = {title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'}

  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}

  paymentData : AsyncPaymentOptions = {
         public_key: this.publicKey,
         tx_ref: this.generateReference(),
         amount: 10,
         currency: 'NGN',
         payment_options: 'card,ussd',
         meta: this.meta,
         customer: this.customerDetails,
         customizations: this.customizations,
        }

  constructor( private flutterwave: Flutterwave) {}

  payViaPromise() {
    this.flutterwave.asyncInlinePay(this.paymentData).then(
      (response) =>{
        console.log("Promise Res" , response)
        this.flutterwave.closePaymentModal(5)
      }
    )
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

}

```

<a id="deployment"></a>
## 🚀 Deployment

- Switch to Live Mode on the Dashboard settings page
- Use the Live Public API key 

<a id="build-tools"></a>
## ⛏️ Built Using

- [Angular CLI](https://cli.angular.io/) 
- [Typescript](https://www.typescriptlang.org/)
- [Angular](https://angular.io/)
- [ng-packagr](https://github.com/ng-packagr/ng-packagr)



<a id="references"></a>
## 🎉 Flutterwave API  References

- [Flutterwave API Doc](https://developer.flutterwave.com/docs)
- [Flutterwave Inline Payment Doc](https://developer.flutterwave.com/docs/flutterwave-inline)
- [Flutterwave Dashboard](https://dashboard.flutterwave.com/login)  
