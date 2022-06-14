<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Flutterwave Angular SDK

![Node.js Package](https://github.com/Flutterwave/Flutterwave-Angular-v3/workflows/Node.js%20Package/badge.svg)
![npm](https://img.shields.io/npm/v/flutterwave-angular-v3)
![npm](https://img.shields.io/npm/dt/flutterwave-angular-v3)
![NPM](https://img.shields.io/npm/l/flutterwave-angular-v3)

## Introduction

The Angular SDK helps you create seamless payment experiences in your Angular mobile or web app. By connecting to our modal, you can start collecting payment in no time.

Available features include:

- Collections: Card, Account, Mobile money, Bank Transfers, USSD, Barter, NQR.
- Recurring payments: Tokenization and Subscriptions.
- Split payments

## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Initialization](#Initialization)
4. [Usage](#usage)
5. [Support](#support)
6. [Contribution Guidelines](#contribution-guidelines)
7. [License](#license)

## Requirements

1. Flutterwave version 3 API keys
2. Node version >= 6.9.x and npm >= 3.x.x
3. Angular version  >= 4

## Installation

Install the SDK

```bash
$ npm install flutterwave-angular-v3
# or
$ yarn  add  flutterwave-angular-v3

```

## Initialization

Import FlutterwaveModule to the app root module

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

> NB: If you experience compilation errors in your app after importing the Flutterwave module, component or service.
Kindly include the following line in tsconfig.app.json under `compilerOptions` :

```
paths": { "@angular/*": [ "node_modules/@angular/*" ] }
```

Then restart server and try again

## Usage

You can use Flutterwave in your projects as a component or directly in your code:

1. [As a Component](#using-flutterwave-as-a-component)
2. [Directly in your code](#using-flutterwave-directly-in-your-code)

### Using Flutterwave as a Component

#### Method 1

Pass in payment parameters individually as component attributes.

```typescript
import { Component, OnInit } from "@angular/core";
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from "flutterwave-angular-v3";
@Component({
  selector: "app-root",
  template: ` <flutterwave-make-payment
    [public_key]="publicKey"
    amount="10"
    currency="NGN"
    payment_options="card"
    redirect_url=""
    text="Pay Now"
    [customer]="customerDetails"
    [customizations]="customizations"
    [meta]="meta"
    [tx_ref]="generateReference()"
    (callback)="makePaymentCallback($event)"
    (close)="closedPaymentModal()"
  >
  </flutterwave-make-payment>`,
})
export class AppComponent {
  //use your PUBLIC_KEY here
  publicKey = "FLWPUBK_TEST-XXXXX-X";

  customerDetails = {
    name: "Demo Customer  Name",
    email: "customer@mail.com",
    phone_number: "08100000000",
  };

  customizations = {
    title: "Customization Title",
    description: "Customization Description",
    logo: "https://flutterwave.com/images/logo-colored.svg",
  };

  meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };

  constructor(private flutterwave: Flutterwave) {}

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5);
  }
  closedPaymentModal(): void {
    console.log("payment is closed");
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
```

#### Method 2

Pass in the payment parameters as an object to the component `data` attribute.

```typescript
import { Component, OnInit } from "@angular/core";
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from "flutterwave-angular-v3";

@Component({
  selector: "app-root",
  template: ` <flutterwave-make-payment
    [data]="paymentData"
  ></flutterwave-make-payment>`,
})
export class AppComponent {
  publicKey = "FLWPUBK_TEST-0b0-XXXXXXXXXXX";

  customerDetails = {
    name: "Demo Customer  Name",
    email: "customer@mail.com",
    phone_number: "08100000000",
  };

  customizations = {
    title: "Customization Title",
    description: "Customization Description",
    logo: "https://flutterwave.com/images/logo-colored.svg",
  };

  meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };

  paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: "NGN",
    payment_options: "card,ussd",
    redirect_url: "",
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this,
  };

  constructor(private flutterwave: Flutterwave) {}
  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5);
  }
  closedPaymentModal(): void {
    console.log("payment is closed");
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
```

### Using Flutterwave directly in your code

#### Method 1

Using the Flutterwave service.

```typescript
import { Component } from "@angular/core";
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from "flutterwave-angular-v3";

@Component({
  selector: "app-root",
  template: `<button (click)="makePayment()">Pay</button>`,
})
export class AppComponent {
  publicKey = "FLWPUBK_TEST-XXXXXXXXX";

  customerDetails = {
    name: "Demo Customer  Name",
    email: "customer@mail.com",
    phone_number: "08100000000",
  };

  customizations = {
    title: "Customization Title",
    description: "Customization Description",
    logo: "https://flutterwave.com/images/logo-colored.svg",
  };

  meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };

  paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: "NGN",
    payment_options: "card,ussd",
    redirect_url: "",
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this,
  };
  //Inject the flutterwave service
  constructor(private flutterwave: Flutterwave) {}
  makePayment() {
    this.flutterwave.inlinePay(this.paymentData);
  }
  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Payment callback", response);
  }
  closedPaymentModal(): void {
    console.log("payment is closed");
  }
}
```

#### Method 2 (Promise) 

Async Payment Response.

```typescript
import { Component } from "@angular/core";
import { Flutterwave, AsyncPaymentOptions } from "flutterwave-angular-v3";

@Component({
  selector: "app-root",
  template: ` <button (click)="payViaPromise()">Pay via Promise</button>`,
})
export class AppComponent {
  publicKey = "FLWPUBK_TEST-XXXXXXXXX";

  customerDetails = {
    name: "Demo Customer  Name",
    email: "customer@mail.com",
    phone_number: "08100000000",
  };

  customizations = {
    title: "Customization Title",
    description: "Customization Description",
    logo: "https://flutterwave.com/images/logo-colored.svg",
  };

  meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };

  paymentData: AsyncPaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: "NGN",
    payment_options: "card,ussd",
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
  };

  constructor(private flutterwave: Flutterwave) {}

  payViaPromise() {
    this.flutterwave.asyncInlinePay(this.paymentData).then((response) => {
      console.log("Promise Res", response);
      this.flutterwave.closePaymentModal(5);
    });
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
```

### Recurring Payments

Pass the payment plan ID into your payload to make [recurring payments](https://developer.flutterwave.com/docs/recurring-payments/payment-plans).

```typescript
import { Component, OnInit } from "@angular/core";
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from "flutterwave-angular-v3";
@Component({
  selector: "app-root",
  template: ` <flutterwave-make-payment
    [public_key]="publicKey"
    amount="10"
    currency="NGN"
    payment_options="card"
    payment_plan="6341"
    redirect_url=""
    text="Pay for Payment Plan"
    [customer]="customerDetails"
    [customizations]="customizations"
    [meta]="meta"
    [tx_ref]="generateReference()"
    (callback)="makePaymentCallback($event)"
    (close)="closedPaymentModal()"
  >
  </flutterwave-make-payment>`,
})
export class AppComponent {
  //use your PUBLIC_KEY here
  publicKey = "FLWPUBK_TEST-XXXXX-X";

  customerDetails = {
    name: "Demo Customer  Name",
    email: "customer@mail.com",
    phone_number: "08100000000",
  };

  customizations = {
    title: "Customization Title",
    description: "Customization Description",
    logo: "https://flutterwave.com/images/logo-colored.svg",
  };

  meta = { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" };

  constructor(private flutterwave: Flutterwave) {}

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5);
  }
  closedPaymentModal(): void {
    console.log("payment is closed");
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}
```

### Parameters

Read more about our parameters and how they can be used [here](https://developer.flutterwave.com/docs/collecting-payments/inline).

| Parameter           | Always Required ? | Description                                                                                                                                                                                                                             |
| ------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public_key          | True              | Your API public key                                                                                                                                                                                                                     |
| tx_ref              | True              | Your transaction reference. This MUST be unique for every transaction                                                                                                                                                                   |
| amount              | True              | Amount to charge the customer.                                                                                                                                                                                                          |
| currency            | False             | currency to charge in. Defaults to NGN                                                                                                                                                                                                  |
| integrity_hash      | False             | This is a sha256 hash of your FlutterwaveCheckout values, it is used for passing secured values to the payment gateway.                                                                                                                 |
| payment_options     | True              | This specifies the payment options to be displayed e.g - card, mobilemoney, ussd and so on.                                                                                                                                             |
| payment_plan        | False             | This is the payment plan ID used for Recurring billing                                                                                                                                                                                  |
| redirect_url        | False             | URL to redirect to when a transaction is completed. This is useful for 3DSecure payments so we can redirect your customer back to a custom page you want to show them.                                                                  |
| customer            | True              | This is an object that can contains your customer details: e.g - 'customer': {'email': 'example@example.com','phonenumber': '08012345678','name': 'Takeshi Kovacs' }                                                                    |
| subaccounts         | False             | This is an array of objects containing the subaccount IDs to split the payment into. Check our Split Payment page for more info                                                                                                         |
| meta                | False             | This is an object that helps you include additional payment information to your request e.g {'consumer_id': 23,'consumer_mac': '92a3-912ba-1192a' }                                                                                     |
| customizations      | True              | This is an object that contains title, logo, and description you want to display on the modal e.g{'title': 'Pied Piper Payments','description': 'Middleout isn't free. Pay the price','logo': 'https://assets.piedpiper.com/logo.png' } |
| callback (function) | False             | This is the function that runs after payment is completed                                                                                                                                                                               |
| close (function)    | False             | This is the function that runs after payment modal is closed                                                                                                                                                                            |

### Methods

Methods provided by Flutterwave service and descriptions:

| Method Name       | Parameters                                    | Returns | Description                                                                                                                |
| ----------------- | --------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| inlinePay         | InlinePaymentOptions : Object                 | Null    | This methods allows you to setup and open the payment modal via code                                                       |
| asyncInlinePay    | AsyncPaymentOptions : Object                  | Promise | This methods allows you to setup and open the payment modal via code and returns a promise containing the payment response |
| closePaymentModal | waitDuration : number (Optional, default = 0) | Null    | This methods allows you to close the payment modal via code. You can setup the wait time before modal close                |


## Debugging Errors

We understand that you may run into some errors while integrating our library. You can read more about our error messages [here](https://developer.flutterwave.com/docs/integration-guides/errors).

For `authorization` and `validation` error responses, double-check your API keys and request. If you get a `server` error, kindly engage the team for support.

NB: If you experience compilation errors in your app after importing the Flutterwave module, component or service.
Kindly include the following line in tsconfig.app.json under `compilerOptions` :

```
paths": { "@angular/*": [ "node_modules/@angular/*" ] }
```

Then restart server and try again

# Support

For additional assistance using this library, please create an issue on the Github repo or contact the developer experience (DX) team via [email](mailto:developers@flutterwavego.com) or on [slack](https://bit.ly/34Vkzcg).

You can also follow us [@FlutterwaveEng](https://twitter.com/FlutterwaveEng) and let us know what you think 😊.

## Contribution Guidelines

We welcome contributions from the community.
Please see the contribution.md for contributions guidelines.

## License

By contributing to this library, you agree that your contributions will be licensed under its MIT license.

Copyright (c) Flutterwave Inc.

## Built Using

- [Angular CLI](https://cli.angular.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Angular](https://angular.io/)
- [ng-packagr](https://github.com/ng-packagr/ng-packagr)
