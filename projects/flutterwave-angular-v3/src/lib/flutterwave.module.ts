import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlutterwaveService } from './flutterwave.service';
import { ApiTrackingService } from './api-tracking.service';

@NgModule({
  declarations: [],
  providers: [FlutterwaveService, ApiTrackingService],
  imports: [
    CommonModule
  ]
})
export class FlutterwaveModule {
  constructor() {
    const inlineSdk = 'https://checkout.flutterwave.com/v3.js';
    const script = document.createElement('script');
    script.src = inlineSdk;
    if (!document.querySelector(`[src="${inlineSdk}"]`)) {
      document.body.appendChild(script)
    }
  }
}
