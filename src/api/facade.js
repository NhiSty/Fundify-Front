export class Facade {
  baseApiUrl = 'http://localhost:1337';
  static instance;
  constructor() {}

  static getInstance() {
    if (!Facade.instance) {
      Facade.instance = new Facade();
    }

    return Facade.instance;
  }

  async submitMerchant(formData) {
    console.log('formData', formData)
    return fetch(`${this.baseApiUrl}/api/auth/merchant/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        lastname: formData.lastname,
        firstname: formData.firstname,
        society: formData.society,
        kbis: formData.kbis,
        phone: formData.phone,
        currency: formData.currency,
        rejectUrl: formData.rejectUrl,
        confirmationUrl: formData.confirmationUrl,
      }),
    });
  }
}
