import * as i0 from "@angular/core";
export declare class ApiTrackingService {
    trackingEndPoint: string;
    packageVersion: string;
    language: string;
    constructor();
    track(data: {
        paymentData: object | any;
        response: object | any;
        responseTime: string;
    }): void;
    submitTracking(data: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApiTrackingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ApiTrackingService>;
}
