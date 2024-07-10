// This reference is necessary to ensure TypeScript recognizes the global FlutterwaveCheckout function.
/// <reference path="../index.d.ts" />
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./api-tracking.service";
export class FlutterwaveService {
    constructor(tracker) {
        this.tracker = tracker;
    }
    inlinePay(paymentData) {
        const data = {
            ...paymentData,
            callback: (response) => {
                this.submitToTracker(paymentData, response, 10000);
                if (paymentData.callbackContext && paymentData.callback) {
                    paymentData.callbackContext[paymentData.callback.name](response);
                }
            },
            onclose: () => {
                try {
                    if (paymentData.callbackContext && paymentData.onclose) {
                        paymentData.callbackContext[paymentData.onclose.name]();
                    }
                }
                catch (e) { }
            }
        };
        if (window.FlutterwaveCheckout) {
            window.FlutterwaveCheckout(data);
        }
        else {
            console.error('FlutterwaveCheckout is not defined');
        }
    }
    asyncInlinePay(paymentData) {
        return new Promise((resolve, reject) => {
            paymentData = {
                ...paymentData,
                callback: ($event) => {
                    this.submitToTracker(paymentData, $event, 10000);
                    resolve($event);
                },
                onclose: () => resolve('closed')
            };
            if (window.FlutterwaveCheckout) {
                window.FlutterwaveCheckout(paymentData);
            }
            else {
                console.error('FlutterwaveCheckout is not defined');
            }
        });
    }
    submitToTracker(paymentData, response, responseTime) {
        this.tracker.track({
            paymentData,
            response,
            responseTime
        });
    }
    /**
     *
     * @param waitDuration {Number} Seconds before closing payment modal
     */
    closePaymentModal(waitDuration = 0) {
        setTimeout(() => {
            document.getElementsByName('checkout')[0].setAttribute('style', 'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
            document.body.style.overflow = '';
            // document.getElementsByName('checkout')[0].setAttribute('style', 'z-index: -1; opacity: 0')
        }, waitDuration * 1000);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveService, deps: [{ token: i1.ApiTrackingService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: FlutterwaveService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.ApiTrackingService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx1dHRlcndhdmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2ZsdXR0ZXJ3YXZlLWFuZ3VsYXItdjMvc3JjL2xpYi9mbHV0dGVyd2F2ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVHQUF1RztBQUN2RyxzQ0FBc0M7QUFFdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBb0IsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFDL0MsQ0FBQztJQUVELFNBQVMsQ0FBQyxXQUFpQztRQUN6QyxNQUFNLElBQUksR0FBRztZQUNYLEdBQUcsV0FBVztZQUNkLFFBQVEsRUFBRSxDQUFDLFFBQWdDLEVBQUUsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUcsUUFBUSxFQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLFdBQVcsQ0FBQyxlQUFlLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN2RCxXQUFXLENBQUMsZUFBK0MsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRyxDQUFDO1lBQ0gsQ0FBQztZQUNELE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDO29CQUNILElBQUksV0FBVyxDQUFDLGVBQWUsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ3RELFdBQVcsQ0FBQyxlQUErQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDM0YsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDO1lBQ2hCLENBQUM7U0FDRixDQUFDO1FBRUYsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMvQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDdEQsQ0FBQztJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsV0FBZ0M7UUFDN0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxXQUFXLEdBQUc7Z0JBQ1osR0FBRyxXQUFXO2dCQUNkLFFBQVEsRUFBRSxDQUFDLE1BQThCLEVBQUUsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUcsTUFBTSxFQUFHLEtBQUssQ0FBQyxDQUFDO29CQUNuRCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7YUFDakMsQ0FBQztZQUVGLElBQUksTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQyxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3RELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxlQUFlLENBQUMsV0FBZ0IsRUFBRSxRQUFhLEVBQUUsWUFBaUI7UUFDaEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDakIsV0FBVztZQUNYLFFBQVE7WUFDUixZQUFZO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNEOzs7T0FHRztJQUNILGlCQUFpQixDQUFDLGVBQXVCLENBQUM7UUFDeEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUM1RCwwR0FBMEcsQ0FBQyxDQUFDO1lBQzlHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkMsNkZBQTZGO1FBQzlGLENBQUMsRUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQzs4R0FsRVUsa0JBQWtCO2tIQUFsQixrQkFBa0IsY0FETixNQUFNOzsyRkFDbEIsa0JBQWtCO2tCQUQ5QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgcmVmZXJlbmNlIGlzIG5lY2Vzc2FyeSB0byBlbnN1cmUgVHlwZVNjcmlwdCByZWNvZ25pemVzIHRoZSBnbG9iYWwgRmx1dHRlcndhdmVDaGVja291dCBmdW5jdGlvbi5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbmRleC5kLnRzXCIgLz5cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXN5bmNQYXltZW50T3B0aW9ucywgSW5saW5lUGF5bWVudE9wdGlvbnMsIFBheW1lbnRTdWNjZXNzUmVzcG9uc2UgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBBcGlUcmFja2luZ1NlcnZpY2UgfSBmcm9tICcuL2FwaS10cmFja2luZy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgRmx1dHRlcndhdmVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFja2VyOiBBcGlUcmFja2luZ1NlcnZpY2UpIHtcbiAgfVxuXG4gIGlubGluZVBheShwYXltZW50RGF0YTogSW5saW5lUGF5bWVudE9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgLi4ucGF5bWVudERhdGEsXG4gICAgICBjYWxsYmFjazogKHJlc3BvbnNlOiBQYXltZW50U3VjY2Vzc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMuc3VibWl0VG9UcmFja2VyKHBheW1lbnREYXRhICwgcmVzcG9uc2UsICAxMDAwMCk7XG4gICAgICAgIGlmIChwYXltZW50RGF0YS5jYWxsYmFja0NvbnRleHQgJiYgcGF5bWVudERhdGEuY2FsbGJhY2spIHtcbiAgICAgICAgICAocGF5bWVudERhdGEuY2FsbGJhY2tDb250ZXh0IGFzIHsgW2tleTogc3RyaW5nXTogRnVuY3Rpb24gfSlbcGF5bWVudERhdGEuY2FsbGJhY2submFtZV0ocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25jbG9zZTogKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChwYXltZW50RGF0YS5jYWxsYmFja0NvbnRleHQgJiYgcGF5bWVudERhdGEub25jbG9zZSkge1xuICAgICAgICAgICAgKHBheW1lbnREYXRhLmNhbGxiYWNrQ29udGV4dCBhcyB7IFtrZXk6IHN0cmluZ106IEZ1bmN0aW9uIH0pW3BheW1lbnREYXRhLm9uY2xvc2UubmFtZV0oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh3aW5kb3cuRmx1dHRlcndhdmVDaGVja291dCkge1xuICAgICAgd2luZG93LkZsdXR0ZXJ3YXZlQ2hlY2tvdXQoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZsdXR0ZXJ3YXZlQ2hlY2tvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cblxuICBhc3luY0lubGluZVBheShwYXltZW50RGF0YTogQXN5bmNQYXltZW50T3B0aW9ucyk6IFByb21pc2U8UGF5bWVudFN1Y2Nlc3NSZXNwb25zZSB8ICdjbG9zZWQnPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHBheW1lbnREYXRhID0ge1xuICAgICAgICAuLi5wYXltZW50RGF0YSxcbiAgICAgICAgY2FsbGJhY2s6ICgkZXZlbnQ6IFBheW1lbnRTdWNjZXNzUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICB0aGlzLnN1Ym1pdFRvVHJhY2tlcihwYXltZW50RGF0YSAsICRldmVudCwgIDEwMDAwKTtcbiAgICAgICAgICByZXNvbHZlKCRldmVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uY2xvc2U6ICgpID0+IHJlc29sdmUoJ2Nsb3NlZCcpXG4gICAgICB9O1xuXG4gICAgICBpZiAod2luZG93LkZsdXR0ZXJ3YXZlQ2hlY2tvdXQpIHtcbiAgICAgICAgd2luZG93LkZsdXR0ZXJ3YXZlQ2hlY2tvdXQocGF5bWVudERhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmx1dHRlcndhdmVDaGVja291dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3VibWl0VG9UcmFja2VyKHBheW1lbnREYXRhOiBhbnksIHJlc3BvbnNlOiBhbnksIHJlc3BvbnNlVGltZTogYW55KSB7XG4gICAgdGhpcy50cmFja2VyLnRyYWNrKHtcbiAgICAgIHBheW1lbnREYXRhLFxuICAgICAgcmVzcG9uc2UsXG4gICAgICByZXNwb25zZVRpbWVcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHdhaXREdXJhdGlvbiB7TnVtYmVyfSBTZWNvbmRzIGJlZm9yZSBjbG9zaW5nIHBheW1lbnQgbW9kYWxcbiAgICovXG4gIGNsb3NlUGF5bWVudE1vZGFsKHdhaXREdXJhdGlvbjogbnVtYmVyID0gMCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NoZWNrb3V0JylbMF0uc2V0QXR0cmlidXRlKCdzdHlsZScsXG4gICAgICAgICdwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7ei1pbmRleDotMTtib3JkZXI6bm9uZTtvcGFjaXR5OjA7cG9pbnRlci1ldmVudHM6bm9uZTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlOycpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY2hlY2tvdXQnKVswXS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3otaW5kZXg6IC0xOyBvcGFjaXR5OiAwJylcbiAgICB9LCB3YWl0RHVyYXRpb24gKiAxMDAwKTtcbiAgfVxufVxuIl19