import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  decodeJwt() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      try {
        const payloadObj = JSON.parse(decodedPayload);
        const name = payloadObj.name;
        const acr = payloadObj.acr;
        console.log('Name:', name);
        console.log('ACR:', acr);
        return { name, acr };
      } catch (e) {
        console.error('Failed to parse JWT payload:', e);
        return null;
      }
    } else {
      console.error('Token not found in localStorage');
      return null;
    }
  }
}
