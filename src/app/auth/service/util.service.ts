import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UtilService {

    constructor() {}

    async removerSessionStorage(action) {
        if (action === 'registro') {
            sessionStorage.removeItem('registro/conta');
            sessionStorage.removeItem('registro/contato');
            sessionStorage.removeItem('registro/perfil');
            sessionStorage.removeItem('registro/codigo-sms');
        } else {
            sessionStorage.removeItem('esqueceu-senha/codigo-sms');
            sessionStorage.removeItem('esqueceu-senha/dados');
            sessionStorage.removeItem('esqueceu-senha/senha-nova');
        }
    }
}
