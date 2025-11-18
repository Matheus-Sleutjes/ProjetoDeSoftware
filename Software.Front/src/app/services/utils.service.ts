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

  getParametersFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const acr = urlParams.get('acr');
    return {
      name: name || '',
      acr: acr || ''
    };
  }

  formatCpf(cpf: string): string {
    const digits = (cpf || '').replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
  }


}
