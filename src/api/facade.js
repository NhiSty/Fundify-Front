import {Endpoint} from "@/api/endpoint";

export class Facade {
  baseApiUrl = 'http://localhost:1337/api';
  static instance;
  constructor() {}

  static getInstance() {
    if (!Facade.instance) {
      Facade.instance = new Facade();
    }

    return Facade.instance;
  }

  // Permet d'ajouter un nouveau marchand
  async submitMerchant(formData) {
    const url = this.baseApiUrl + Endpoint.authMerchantSignup;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contactEmail: formData.contactEmail,
        password: formData.password,
        contactLastName: formData.contactLastName,
        contactFirstName: formData.contactFirstName,
        companyName: formData.companyName,
        kbis: formData.kbis,
        contactPhone: formData.contactPhone,
        currency: formData.currency,
        confirmationRedirectUrl: formData.confirmationRedirectUrl,
        cancellationRedirectUrl: formData.cancellationRedirectUrl,
      }),
    });
  }

  // Se connecter à son espace marchand
  async loginMerchant(formData) {
    const url = this.baseApiUrl + Endpoint.authMerchantLogin;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contactEmail: formData.email,
        password: formData.password,
      }),
    });
  }
}
