import {Injectable} from '@angular/core';


@Injectable()
export class ApiTracking {

  trackingEndPoint = 'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent';

  packageVersion = '1.2.1';
  language = 'Angular V3'

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
  }

  track(data: {
    paymentData: object | any,
    response: object | any,
    responseTime: string
  }) {

    const trackingData = {
      publicKey: data.paymentData.public_key,
      language: this.language,
      version: this.packageVersion,
      title: '',
      message: '0' // data.responseTime

    }

    const paymentOptions = data.paymentData.payment_options || ''
    const paymentOptionsArray = paymentOptions ?  paymentOptions.split(',') : []




    let title = ''

    if (paymentOptionsArray.length === 0) {
      title = 'Initiate-Charge-Dashboard'
    } else if (paymentOptionsArray.length === 1) {
      title = 'Initiate-Charge-' + paymentOptions

    } else {
      title = 'Initiate-Charge-Multiple'

    }

    trackingData.title = data.response.status === 'successful' ? title : title + '-error'

    this.submitTracking(trackingData)

  }


  submitTracking(data) {

    fetch(this.trackingEndPoint, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then((res) => {
    })

  }


}

/*

interface tracking-data {
  merchantId: string,
  language: string
}
*/

