import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ApiTrackingService {
    /*  trackingFeatures = {
        'initiateCardCharge': 'Initiate-Card-charge',
        'initiateCardChargeError': 'Initiate-Card-charge-error',
        'validateCardCharge': 'Validate-Card-charge',
        'validateCardChargeError': 'Validate-Card-charge-error',
        'verifyCardCharge': 'Verify-Card-charge',
        'verifyCardChargeError': 'Verify-Card-charge-error',
        'initiateAccountCharge': 'Initiate-Account-charge',
        'initiateAccountChargeError': 'Initiate-Account-charge-error',
        'accountChargeValidate': 'Account-charge-validate',
        'accountChargeValidateError': 'Account-charge-validate-error',
        'accountChargeVerify': 'Account-charge-verify',
        'accountChargeVerifyError': 'Account-charge-verify-error',
      }*/
    constructor() {
        this.trackingEndPoint = 'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent';
        this.packageVersion = '1.2.1';
        this.language = 'Angular V3';
    }
    track(data) {
        const trackingData = {
            publicKey: data.paymentData.public_key,
            language: this.language,
            version: this.packageVersion,
            title: '',
            message: '0' // data.responseTime
        };
        const paymentOptions = data.paymentData.payment_options || '';
        const paymentOptionsArray = paymentOptions ? paymentOptions.split(',') : [];
        let title = '';
        if (paymentOptionsArray.length === 0) {
            title = 'Initiate-Charge-Dashboard';
        }
        else if (paymentOptionsArray.length === 1) {
            title = 'Initiate-Charge-' + paymentOptions;
        }
        else {
            title = 'Initiate-Charge-Multiple';
        }
        trackingData.title = data.response.status === 'successful' ? title : title + '-error';
        this.submitTracking(trackingData);
    }
    submitTracking(data) {
        fetch(this.trackingEndPoint, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((res) => {
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ApiTrackingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ApiTrackingService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6", ngImport: i0, type: ApiTrackingService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXRyYWNraW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9mbHV0dGVyd2F2ZS1hbmd1bGFyLXYzL3NyYy9saWIvYXBpLXRyYWNraW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHM0MsTUFBTSxPQUFPLGtCQUFrQjtJQU03Qjs7Ozs7Ozs7Ozs7OztTQWFLO0lBRUw7UUFwQkEscUJBQWdCLEdBQUcsMEVBQTBFLENBQUM7UUFFOUYsbUJBQWMsR0FBRyxPQUFPLENBQUM7UUFDekIsYUFBUSxHQUFHLFlBQVksQ0FBQztJQWtCeEIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUlMO1FBQ0MsTUFBTSxZQUFZLEdBQUc7WUFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVTtZQUN0QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQzVCLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxvQkFBb0I7U0FDbEMsQ0FBQztRQUVGLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUM5RCxNQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRTdFLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVmLElBQUksbUJBQW1CLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3JDLEtBQUssR0FBRywyQkFBMkIsQ0FBQztRQUN0QyxDQUFDO2FBQU0sSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUMsS0FBSyxHQUFHLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztRQUM5QyxDQUFDO2FBQU0sQ0FBQztZQUNOLEtBQUssR0FBRywwQkFBMEIsQ0FBQztRQUNyQyxDQUFDO1FBRUQsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUV0RixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxjQUFjLENBQUMsSUFBUztRQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzNCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OEdBN0RVLGtCQUFrQjtrSEFBbEIsa0JBQWtCLGNBRE4sTUFBTTs7MkZBQ2xCLGtCQUFrQjtrQkFEOUIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFwaVRyYWNraW5nU2VydmljZSB7XG4gIHRyYWNraW5nRW5kUG9pbnQgPSAnaHR0cHM6Ly9rZ2VsZmR6N21mLmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL3N0YWdpbmcvc2VuZGV2ZW50JztcblxuICBwYWNrYWdlVmVyc2lvbiA9ICcxLjIuMSc7XG4gIGxhbmd1YWdlID0gJ0FuZ3VsYXIgVjMnO1xuXG4gIC8qICB0cmFja2luZ0ZlYXR1cmVzID0ge1xuICAgICAgJ2luaXRpYXRlQ2FyZENoYXJnZSc6ICdJbml0aWF0ZS1DYXJkLWNoYXJnZScsXG4gICAgICAnaW5pdGlhdGVDYXJkQ2hhcmdlRXJyb3InOiAnSW5pdGlhdGUtQ2FyZC1jaGFyZ2UtZXJyb3InLFxuICAgICAgJ3ZhbGlkYXRlQ2FyZENoYXJnZSc6ICdWYWxpZGF0ZS1DYXJkLWNoYXJnZScsXG4gICAgICAndmFsaWRhdGVDYXJkQ2hhcmdlRXJyb3InOiAnVmFsaWRhdGUtQ2FyZC1jaGFyZ2UtZXJyb3InLFxuICAgICAgJ3ZlcmlmeUNhcmRDaGFyZ2UnOiAnVmVyaWZ5LUNhcmQtY2hhcmdlJyxcbiAgICAgICd2ZXJpZnlDYXJkQ2hhcmdlRXJyb3InOiAnVmVyaWZ5LUNhcmQtY2hhcmdlLWVycm9yJyxcbiAgICAgICdpbml0aWF0ZUFjY291bnRDaGFyZ2UnOiAnSW5pdGlhdGUtQWNjb3VudC1jaGFyZ2UnLFxuICAgICAgJ2luaXRpYXRlQWNjb3VudENoYXJnZUVycm9yJzogJ0luaXRpYXRlLUFjY291bnQtY2hhcmdlLWVycm9yJyxcbiAgICAgICdhY2NvdW50Q2hhcmdlVmFsaWRhdGUnOiAnQWNjb3VudC1jaGFyZ2UtdmFsaWRhdGUnLFxuICAgICAgJ2FjY291bnRDaGFyZ2VWYWxpZGF0ZUVycm9yJzogJ0FjY291bnQtY2hhcmdlLXZhbGlkYXRlLWVycm9yJyxcbiAgICAgICdhY2NvdW50Q2hhcmdlVmVyaWZ5JzogJ0FjY291bnQtY2hhcmdlLXZlcmlmeScsXG4gICAgICAnYWNjb3VudENoYXJnZVZlcmlmeUVycm9yJzogJ0FjY291bnQtY2hhcmdlLXZlcmlmeS1lcnJvcicsXG4gICAgfSovXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICB0cmFjayhkYXRhOiB7XG4gICAgcGF5bWVudERhdGE6IG9iamVjdCB8IGFueSxcbiAgICByZXNwb25zZTogb2JqZWN0IHwgYW55LFxuICAgIHJlc3BvbnNlVGltZTogc3RyaW5nXG4gIH0pIHtcbiAgICBjb25zdCB0cmFja2luZ0RhdGEgPSB7XG4gICAgICBwdWJsaWNLZXk6IGRhdGEucGF5bWVudERhdGEucHVibGljX2tleSxcbiAgICAgIGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxuICAgICAgdmVyc2lvbjogdGhpcy5wYWNrYWdlVmVyc2lvbixcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIG1lc3NhZ2U6ICcwJyAvLyBkYXRhLnJlc3BvbnNlVGltZVxuICAgIH07XG5cbiAgICBjb25zdCBwYXltZW50T3B0aW9ucyA9IGRhdGEucGF5bWVudERhdGEucGF5bWVudF9vcHRpb25zIHx8ICcnO1xuICAgIGNvbnN0IHBheW1lbnRPcHRpb25zQXJyYXkgPSBwYXltZW50T3B0aW9ucyA/ICBwYXltZW50T3B0aW9ucy5zcGxpdCgnLCcpIDogW107XG5cbiAgICBsZXQgdGl0bGUgPSAnJztcblxuICAgIGlmIChwYXltZW50T3B0aW9uc0FycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGl0bGUgPSAnSW5pdGlhdGUtQ2hhcmdlLURhc2hib2FyZCc7XG4gICAgfSBlbHNlIGlmIChwYXltZW50T3B0aW9uc0FycmF5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGl0bGUgPSAnSW5pdGlhdGUtQ2hhcmdlLScgKyBwYXltZW50T3B0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgdGl0bGUgPSAnSW5pdGlhdGUtQ2hhcmdlLU11bHRpcGxlJztcbiAgICB9XG5cbiAgICB0cmFja2luZ0RhdGEudGl0bGUgPSBkYXRhLnJlc3BvbnNlLnN0YXR1cyA9PT0gJ3N1Y2Nlc3NmdWwnID8gdGl0bGUgOiB0aXRsZSArICctZXJyb3InO1xuXG4gICAgdGhpcy5zdWJtaXRUcmFja2luZyh0cmFja2luZ0RhdGEpO1xuICB9XG5cbiAgc3VibWl0VHJhY2tpbmcoZGF0YTogYW55KSB7XG4gICAgZmV0Y2godGhpcy50cmFja2luZ0VuZFBvaW50LCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgfSk7XG4gIH1cbn1cblxuLypcbmludGVyZmFjZSB0cmFja2luZy1kYXRhIHtcbiAgbWVyY2hhbnRJZDogc3RyaW5nLFxuICBsYW5ndWFnZTogc3RyaW5nXG59XG4qL1xuIl19