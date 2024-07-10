import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlutterwaveService } from './flutterwave.service';
import { ApiTrackingService } from './api-tracking.service';
import * as i0 from "@angular/core";
export class FlutterwaveModule {
    constructor() {
        const inlineSdk = 'https://checkout.flutterwave.com/v3.js';
        const script = document.createElement('script');
        script.src = inlineSdk;
        if (!document.querySelector(`[src="${inlineSdk}"]`)) {
            document.body.appendChild(script);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveModule, imports: [CommonModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveModule, providers: [FlutterwaveService, ApiTrackingService], imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    providers: [FlutterwaveService, ApiTrackingService],
                    imports: [
                        CommonModule
                    ]
                }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx1dHRlcndhdmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZmx1dHRlcndhdmUtYW5ndWxhci12My9zcmMvbGliL2ZsdXR0ZXJ3YXZlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFTNUQsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QjtRQUNFLE1BQU0sU0FBUyxHQUFHLHdDQUF3QyxDQUFDO1FBQzNELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxTQUFTLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkMsQ0FBQztJQUNILENBQUM7OEdBUlUsaUJBQWlCOytHQUFqQixpQkFBaUIsWUFIMUIsWUFBWTsrR0FHSCxpQkFBaUIsYUFMakIsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxZQUVqRCxZQUFZOzsyRkFHSCxpQkFBaUI7a0JBUDdCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDO29CQUNuRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmx1dHRlcndhdmVTZXJ2aWNlIH0gZnJvbSAnLi9mbHV0dGVyd2F2ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVRyYWNraW5nU2VydmljZSB9IGZyb20gJy4vYXBpLXRyYWNraW5nLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBwcm92aWRlcnM6IFtGbHV0dGVyd2F2ZVNlcnZpY2UsIEFwaVRyYWNraW5nU2VydmljZV0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGbHV0dGVyd2F2ZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGlubGluZVNkayA9ICdodHRwczovL2NoZWNrb3V0LmZsdXR0ZXJ3YXZlLmNvbS92My5qcyc7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNyYyA9IGlubGluZVNkaztcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtzcmM9XCIke2lubGluZVNka31cIl1gKSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXG4gICAgfVxuICB9XG59XG4iXX0=