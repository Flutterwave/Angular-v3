import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlutterwaveService } from '../flutterwave.service';
import { ApiTrackingService } from '../api-tracking.service';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "../flutterwave.service";
import * as i2 from "@angular/common";
export class MakePaymentComponent {
    constructor(flutterwaveService) {
        this.flutterwaveService = flutterwaveService;
        this.callback = new EventEmitter();
        this.close = new EventEmitter();
        this.customer_defaults = {
            email: '',
            phone_number: '',
            name: ''
        };
        this.meta_defaults = {
            consumer_id: '',
            consumer_mac: ''
        };
        this.customizations_defaults = {
            title: '',
            description: '',
            logo: ''
        };
        const inlineSdk = 'https://checkout.flutterwave.com/v3.js';
        const script = document.createElement('script');
        script.src = inlineSdk;
        if (!document.querySelector(`[src="${inlineSdk}"]`)) {
            document.body.appendChild(script);
        }
    }
    ngOnInit() {
    }
    makePayment() {
        this.prepareForPayment();
        if (window.FlutterwaveCheckout) {
            window.FlutterwaveCheckout(this.inlinePaymentOptions);
        }
        else {
            console.error('FlutterwaveCheckout is not defined');
        }
    }
    prepareForPayment() {
        this.customer = this.customer || {};
        this.meta = this.meta || {};
        this.customizations = this.customizations || {};
        if (this.data) {
            this.inlinePaymentOptions = {
                ...this.data,
                callback: response => {
                    this.flutterwaveService.submitToTracker(this.data, response, 10000);
                    if (this.data?.callbackContext && this.data.callback) {
                        this.data.callbackContext[this.data.callback.name](response);
                    }
                },
                onclose: () => {
                    try {
                        if (this.data?.callbackContext && this.data.onclose) {
                            this.data.callbackContext[this.data.onclose.name]();
                        }
                    }
                    catch (e) {
                    }
                },
            };
        }
        else {
            this.inlinePaymentOptions = {
                callbackContext: null,
                public_key: this.public_key,
                tx_ref: this.tx_ref,
                amount: this.amount,
                currency: this.currency || 'NGN',
                payment_options: this.payment_options || 'card, mobilemoney, ussd',
                redirect_url: this.redirect_url || '',
                meta: { ...this.meta_defaults, ...this.meta },
                customer: { ...this.customer_defaults, ...this.customer },
                callback: (response) => {
                    this.flutterwaveService.submitToTracker(this.inlinePaymentOptions, response, 10000);
                    this.callback.emit(response);
                },
                onclose: () => this.close.emit(),
                customizations: {
                    ...this.customizations_defaults,
                    ...this.customizations
                }
            };
            if (this.payment_plan) {
                this.inlinePaymentOptions.payment_plan = this.payment_plan;
            }
            if (this.subaccounts) {
                this.inlinePaymentOptions.subaccounts = this.subaccounts;
            }
            if (this.integrity_hash) {
                this.inlinePaymentOptions.integrity_hash = this.integrity_hash;
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: MakePaymentComponent, deps: [{ token: i1.FlutterwaveService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.6", type: MakePaymentComponent, isStandalone: true, selector: "flutterwave-make-payment", inputs: { public_key: "public_key", tx_ref: "tx_ref", amount: "amount", currency: "currency", payment_options: "payment_options", payment_plan: "payment_plan", subaccounts: "subaccounts", integrity_hash: "integrity_hash", redirect_url: "redirect_url", meta: "meta", customer: "customer", customizations: "customizations", text: "text", style: "style", className: "className", data: "data" }, outputs: { callback: "callback", close: "close" }, providers: [FlutterwaveService, ApiTrackingService], ngImport: i0, template: "<button\n  [ngStyle]=\"style\"\n  [ngClass]=\"className ? className : 'flutterwave-pay-button'\"\n  (click)=\"makePayment()\">\n  {{text || 'Pay'}}\n</button>\n", styles: [".flutterwave-pay-button{background-color:#f5a623;border-radius:4px;border-color:#f5a623;box-shadow:0 2px 3px #ccc;color:#fff;display:block;font-size:12px;font-weight:700;padding:14px 22px;text-align:center;text-decoration:none;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: MakePaymentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'flutterwave-make-payment', standalone: true, providers: [FlutterwaveService, ApiTrackingService], imports: [
                        CommonModule
                    ], template: "<button\n  [ngStyle]=\"style\"\n  [ngClass]=\"className ? className : 'flutterwave-pay-button'\"\n  (click)=\"makePayment()\">\n  {{text || 'Pay'}}\n</button>\n", styles: [".flutterwave-pay-button{background-color:#f5a623;border-radius:4px;border-color:#f5a623;box-shadow:0 2px 3px #ccc;color:#fff;display:block;font-size:12px;font-weight:700;padding:14px 22px;text-align:center;text-decoration:none;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}\n"] }]
        }], ctorParameters: () => [{ type: i1.FlutterwaveService }], propDecorators: { public_key: [{
                type: Input
            }], tx_ref: [{
                type: Input
            }], amount: [{
                type: Input
            }], currency: [{
                type: Input
            }], payment_options: [{
                type: Input
            }], payment_plan: [{
                type: Input
            }], subaccounts: [{
                type: Input
            }], integrity_hash: [{
                type: Input
            }], redirect_url: [{
                type: Input
            }], meta: [{
                type: Input
            }], customer: [{
                type: Input
            }], callback: [{
                type: Output
            }], close: [{
                type: Output
            }], customizations: [{
                type: Input
            }], text: [{
                type: Input
            }], style: [{
                type: Input
            }], className: [{
                type: Input
            }], data: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZS1wYXltZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsdXR0ZXJ3YXZlLWFuZ3VsYXItdjMvc3JjL2xpYi9tYWtlLXBheW1lbnQvbWFrZS1wYXltZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsdXR0ZXJ3YXZlLWFuZ3VsYXItdjMvc3JjL2xpYi9tYWtlLXBheW1lbnQvbWFrZS1wYXltZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBWS9DLE1BQU0sT0FBTyxvQkFBb0I7SUFxQy9CLFlBQW9CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBekJoRCxhQUFRLEdBQXlDLElBQUksWUFBWSxFQUEwQixDQUFDO1FBQzVGLFVBQUssR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVN4RCxzQkFBaUIsR0FBRztZQUNsQixLQUFLLEVBQUUsRUFBRTtZQUNULFlBQVksRUFBRSxFQUFFO1lBQ2hCLElBQUksRUFBRSxFQUFFO1NBQ1QsQ0FBQztRQUNGLGtCQUFhLEdBQUc7WUFDZCxXQUFXLEVBQUUsRUFBRTtZQUNmLFlBQVksRUFBRSxFQUFFO1NBQ2pCLENBQUM7UUFDRiw0QkFBdUIsR0FBRztZQUN4QixLQUFLLEVBQUUsRUFBRTtZQUNULFdBQVcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFDO1FBR0Es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RyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csS0FBSztzQkFBZCxNQUFNO2dCQUNFLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbHV0dGVyd2F2ZVNlcnZpY2UgfSBmcm9tICcuLi9mbHV0dGVyd2F2ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVRyYWNraW5nU2VydmljZSB9IGZyb20gJy4uL2FwaS10cmFja2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IElubGluZVBheW1lbnRPcHRpb25zLCBQYXltZW50U3VjY2Vzc1Jlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZsdXR0ZXJ3YXZlLW1ha2UtcGF5bWVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHByb3ZpZGVyczogW0ZsdXR0ZXJ3YXZlU2VydmljZSwgQXBpVHJhY2tpbmdTZXJ2aWNlXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vbWFrZS1wYXltZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL21ha2UtcGF5bWVudC5jb21wb25lbnQuY3NzJ1xufSlcbmV4cG9ydCBjbGFzcyBNYWtlUGF5bWVudENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHB1YmxpY19rZXkhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHR4X3JlZiE6IHN0cmluZztcbiAgQElucHV0KCkgYW1vdW50ITogbnVtYmVyO1xuICBASW5wdXQoKSBjdXJyZW5jeT86IHN0cmluZztcbiAgQElucHV0KCkgcGF5bWVudF9vcHRpb25zPzogc3RyaW5nO1xuICBASW5wdXQoKSBwYXltZW50X3BsYW4/OiBzdHJpbmcgfCBudW1iZXI7XG4gIEBJbnB1dCgpIHN1YmFjY291bnRzOiBhbnk7XG4gIEBJbnB1dCgpIGludGVncml0eV9oYXNoOiBhbnk7XG4gIEBJbnB1dCgpIHJlZGlyZWN0X3VybD86IHN0cmluZztcbiAgQElucHV0KCkgbWV0YT86IG9iamVjdDsgLy8geyBjb3Vuc3VtZXJfaWQsIGNvbnN1bWVyX21hYyB9XG4gIEBJbnB1dCgpIGN1c3RvbWVyPzogb2JqZWN0OyAvLyB7IGVtYWlsLCBwaG9uZV9udW1iZXIsbmFtZSB9XG4gIEBPdXRwdXQoKSBjYWxsYmFjazogRXZlbnRFbWl0dGVyPFBheW1lbnRTdWNjZXNzUmVzcG9uc2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxQYXltZW50U3VjY2Vzc1Jlc3BvbnNlPigpO1xuICBAT3V0cHV0KCkgY2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBjdXN0b21pemF0aW9ucz86IG9iamVjdDsgLy8geyB0aXRsZSwgZGVzY3JpcHRpb24sIGxvZ28gfVxuICBASW5wdXQoKSB0ZXh0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBzdHlsZTogYW55O1xuICBASW5wdXQoKSBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRhdGE/OiBJbmxpbmVQYXltZW50T3B0aW9ucztcblxuICBwcml2YXRlIGlubGluZVBheW1lbnRPcHRpb25zITogSW5saW5lUGF5bWVudE9wdGlvbnM7XG5cbiAgY3VzdG9tZXJfZGVmYXVsdHMgPSB7XG4gICAgZW1haWw6ICcnLFxuICAgIHBob25lX251bWJlcjogJycsXG4gICAgbmFtZTogJydcbiAgfTtcbiAgbWV0YV9kZWZhdWx0cyA9IHtcbiAgICBjb25zdW1lcl9pZDogJycsXG4gICAgY29uc3VtZXJfbWFjOiAnJ1xuICB9O1xuICBjdXN0b21pemF0aW9uc19kZWZhdWx0cyA9IHtcbiAgICB0aXRsZTogJycsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGxvZ286ICcnXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmbHV0dGVyd2F2ZVNlcnZpY2U6IEZsdXR0ZXJ3YXZlU2VydmljZSkge1xuICAgIGNvbnN0IGlubGluZVNkayA9ICdodHRwczovL2NoZWNrb3V0LmZsdXR0ZXJ3YXZlLmNvbS92My5qcyc7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNyYyA9IGlubGluZVNkaztcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtzcmM9XCIke2lubGluZVNka31cIl1gKSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbiAgbWFrZVBheW1lbnQoKSB7XG4gICAgdGhpcy5wcmVwYXJlRm9yUGF5bWVudCgpO1xuICAgIGlmICh3aW5kb3cuRmx1dHRlcndhdmVDaGVja291dCkge1xuICAgICAgd2luZG93LkZsdXR0ZXJ3YXZlQ2hlY2tvdXQodGhpcy5pbmxpbmVQYXltZW50T3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZsdXR0ZXJ3YXZlQ2hlY2tvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cblxuICBwcmVwYXJlRm9yUGF5bWVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmN1c3RvbWVyID0gdGhpcy5jdXN0b21lciB8fCB7fTtcbiAgICB0aGlzLm1ldGEgPSB0aGlzLm1ldGEgfHwge307XG4gICAgdGhpcy5jdXN0b21pemF0aW9ucyA9IHRoaXMuY3VzdG9taXphdGlvbnMgfHwge307XG5cbiAgICBpZiAodGhpcy5kYXRhKSB7XG4gICAgICB0aGlzLmlubGluZVBheW1lbnRPcHRpb25zID0ge1xuICAgICAgICAuLi50aGlzLmRhdGEsXG4gICAgICAgIGNhbGxiYWNrOiByZXNwb25zZSA9PiB7XG4gICAgICAgICAgdGhpcy5mbHV0dGVyd2F2ZVNlcnZpY2Uuc3VibWl0VG9UcmFja2VyKHRoaXMuZGF0YSAsIHJlc3BvbnNlLCAgMTAwMDApO1xuICAgICAgICAgIGlmICh0aGlzLmRhdGE/LmNhbGxiYWNrQ29udGV4dCAmJiB0aGlzLmRhdGEuY2FsbGJhY2spIHtcbiAgICAgICAgICAgICh0aGlzLmRhdGEuY2FsbGJhY2tDb250ZXh0IGFzIHsgW2tleTogc3RyaW5nXTogRnVuY3Rpb24gfSlbdGhpcy5kYXRhLmNhbGxiYWNrLm5hbWVdKHJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uY2xvc2U6ICgpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YT8uY2FsbGJhY2tDb250ZXh0ICYmIHRoaXMuZGF0YS5vbmNsb3NlKSB7XG4gICAgICAgICAgICAgICh0aGlzLmRhdGEuY2FsbGJhY2tDb250ZXh0IGFzIHsgW2tleTogc3RyaW5nXTogRnVuY3Rpb24gfSlbdGhpcy5kYXRhLm9uY2xvc2UubmFtZV0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlubGluZVBheW1lbnRPcHRpb25zID0ge1xuICAgICAgICBjYWxsYmFja0NvbnRleHQ6IG51bGwsXG4gICAgICAgIHB1YmxpY19rZXk6IHRoaXMucHVibGljX2tleSxcbiAgICAgICAgdHhfcmVmOiB0aGlzLnR4X3JlZixcbiAgICAgICAgYW1vdW50OiB0aGlzLmFtb3VudCxcbiAgICAgICAgY3VycmVuY3k6IHRoaXMuY3VycmVuY3kgfHwgJ05HTicsXG4gICAgICAgIHBheW1lbnRfb3B0aW9uczogdGhpcy5wYXltZW50X29wdGlvbnMgfHwgJ2NhcmQsIG1vYmlsZW1vbmV5LCB1c3NkJyxcbiAgICAgICAgcmVkaXJlY3RfdXJsOiB0aGlzLnJlZGlyZWN0X3VybCB8fCAnJyxcbiAgICAgICAgbWV0YTogey4uLnRoaXMubWV0YV9kZWZhdWx0cywgLi4udGhpcy5tZXRhfSxcbiAgICAgICAgY3VzdG9tZXI6IHsuLi50aGlzLmN1c3RvbWVyX2RlZmF1bHRzLCAuLi50aGlzLmN1c3RvbWVyfSxcbiAgICAgICAgY2FsbGJhY2s6IChyZXNwb25zZTogUGF5bWVudFN1Y2Nlc3NSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHRoaXMuZmx1dHRlcndhdmVTZXJ2aWNlLnN1Ym1pdFRvVHJhY2tlcih0aGlzLmlubGluZVBheW1lbnRPcHRpb25zICwgcmVzcG9uc2UsICAxMDAwMCk7XG4gICAgICAgICAgdGhpcy5jYWxsYmFjay5lbWl0KHJlc3BvbnNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25jbG9zZTogKCkgPT4gdGhpcy5jbG9zZS5lbWl0KCksXG4gICAgICAgIGN1c3RvbWl6YXRpb25zOiB7XG4gICAgICAgICAgLi4udGhpcy5jdXN0b21pemF0aW9uc19kZWZhdWx0cyxcbiAgICAgICAgICAuLi50aGlzLmN1c3RvbWl6YXRpb25zXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBheW1lbnRfcGxhbikge1xuICAgICAgICB0aGlzLmlubGluZVBheW1lbnRPcHRpb25zLnBheW1lbnRfcGxhbiA9IHRoaXMucGF5bWVudF9wbGFuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc3ViYWNjb3VudHMpIHtcbiAgICAgICAgdGhpcy5pbmxpbmVQYXltZW50T3B0aW9ucy5zdWJhY2NvdW50cyA9IHRoaXMuc3ViYWNjb3VudHM7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pbnRlZ3JpdHlfaGFzaCkge1xuICAgICAgICB0aGlzLmlubGluZVBheW1lbnRPcHRpb25zLmludGVncml0eV9oYXNoID0gdGhpcy5pbnRlZ3JpdHlfaGFzaDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgW25nU3R5bGVdPVwic3R5bGVcIlxuICBbbmdDbGFzc109XCJjbGFzc05hbWUgPyBjbGFzc05hbWUgOiAnZmx1dHRlcndhdmUtcGF5LWJ1dHRvbidcIlxuICAoY2xpY2spPVwibWFrZVBheW1lbnQoKVwiPlxuICB7e3RleHQgfHwgJ1BheSd9fVxuPC9idXR0b24+XG4iXX0=