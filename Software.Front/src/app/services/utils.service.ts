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
        return { name, acr };
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  }
}
