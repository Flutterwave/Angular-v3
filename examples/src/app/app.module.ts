import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {FlutterwaveModule}  from "flutterwave-angular-v3"   ;


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
export class AppModule { }

