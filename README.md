<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo-colored.svg" width="50%"/>
</p>

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Running tests](#test)
- [Deployment](#deployment)
- [Built Using](#build-tools)
- [References](#references)

<a id="about"></a>
## About

Flutterwave official  Angular library to accept payment via  card , USSD, QrCode etc.

<a id="getting-started"></a>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.
See [references](#references) for links to dashboard and API documentation.


### Prerequisites



```
Node version >= 6.9.x and npm >= 3.x.x
Angular version  >= 4
Flutterwave version 3 API keys

```

### Installation


Install the SDK 

```bash
$ npm install flutterwave-angular-v3
# or
$ yarn  add  flutterwave-angular-v3

```


<a id="usage"></a>

## Usage

Include the Flutterwave V3 script tag to the index.html file
```html

<script src="https://checkout.flutterwave.com/v3.js"></script>

 <!--example below-->

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Flutterwave Angular SDK</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>

<script src="https://checkout.flutterwave.com/v3.js"></script>


</html>



```


Import FlutterwaveModule to the  app root module

```javascript
import FlutterwaveModule from "flutterwave-angular-v3"

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

Use as component. Method 1 

```javascript
//Method 1: Pass  in payment parameters individually as component attributes

<flutterwave-make-payment
  public_key="FLWPUBK_TEST-*************"
  tx_ref="25673*******"
  amount=90000
  currency='NGN'
  payment_options="card,ussd"
  redirect_url=""
  text="Pay Now"
  className="class-name"
  style=""
  [meta]="{counsumer_id: '7898' ,consumer_mac: 'kjs9s8ss7dd'   }"
  [customer]="{ name: 'Demo Customer  Name',email: 'customer@mail.com', phone_number: '0818450****' }"
  [customizations]="{  title: 'Customization Title' ,description: 'Customization Description'  ,  logo : 'https://flutterwave.com/images/logo-colored.svg' }"
  (callback)="makePaymentCallback($event)"
  (close)="cancelledPayment()" 
></flutterwave-make-payment>
```

Use as component. Method 2

```javascript

//Method 2: Pass in the payment parameters as an object to the component 'data' attribute

<flutterwave-make-payment [data]="{
public_key: 'FLWPUBK_TEST-***********',
tx_ref: '78**********',
amount: 9000,
currency: 'NGN',
payment_options: 'card,ussd',
redirect_url: '',
text: 'Pay Now',
className: '',
style: '',
meta :{  'counsumer_id': '7898' , 'consumer_mac'  : 'kjs9s8ss7dd'   },
customer : {name: 'Demo Customer  Name',email: 'customer2@mail.com',phone_number: '081845***' },
customizations: {title: 'Customization Title' , description: 'Customization Description'  , logo : 'https://flutterwave.com/images/logo-colored.svg' } ,
callback:  makePaymentCallback ,
onclose:  cancelledPayment
}
></flutterwave-make-payment>


```


Use in code (Flutterwave service)

```javascript

import { Component } from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3";

@Component({
  selector: 'app-root',
  template: `<button (click)="makePayment()" )>Pay</button>`,
})
export class AppComponent {
  title = 'app';

  paymentData : InlinePaymentOptions =  {
    public_key: 'FLWPUBK_TEST-XXXXX-X',
    tx_ref: '8*********',
    amount: 9000,
    currency: 'NGN',
    payment_options: 'card,ussd',
    redirect_url: '',
    meta : {
      counsumer_id: '7898' ,
      consumer_mac  : 'kjs9s8ss7dd'
    },
    customer : {
      name: 'Demo Customer  Name',
      email: 'customer@mail.com',
      phone_number: '08184******'
    },
    customizations: {
      title: 'Customization Title' ,
      description: 'Customization Description'  ,
      logo : 'https://flutterwave.com/images/logo-colored.svg'
    } ,
    callback:  this.makePaymentCallback ,
    onclose:  this.cancelledPayment
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
  
  cancelledPayment(): void {
    console.log('payment is closed');

  }


}


```



<a id="deployment"></a>
## Deployment

- Switch to Live Mode on the Dashboard settings page
- Use the Live Public API key 

<a id="build-tools"></a>
## Built Using

- [Angular CLI](https://cli.angular.io/) 
- [Typescript](https://www.typescriptlang.org/)
- [Angular](https://angular.io/)


<a id="references"></a>
## 🎉 Flutterwave API  References

- [Flutterwave API Doc](https://developer.flutterwave.com/docs)
- [Flutterwave Inline Payment Doc](https://developer.flutterwave.com/docs/flutterwave-inline)
- [Flutterwave Dashboard](https://dashboard.flutterwave.com/login)  
