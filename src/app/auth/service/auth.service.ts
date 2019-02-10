import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AjaxService } from 'src/shared/service/ajax.service';
import { Usuario, CodigoSMS } from 'src/shared/dto';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(public ajaxService: AjaxService) {}

    async registro(usuario) {
        const url = `${environment.apiBase}autenticacao/registrar`;
        return this.ajaxService.post<any>(url, usuario);
    }

    async efetuarLogin(usuario) {
        const url = `${environment.apiBase}autenticacao/efetuarLogin`;
        return this.ajaxService.post<any>(url, usuario);
    }

    async reenviarCodigo(usuario) {
        const url = `${environment.apiBase}autenticacao/gerarCodigoSMS`;
        return this.ajaxService.post<any>(url, usuario);
    }

    async gerarCodigoSMS(usuario) {
        const url = `${environment.apiBase}autenticacao/gerarCodigoSMS`;
        return this.ajaxService.post<any>(url, usuario);
    }

    async confirmarCodigoEsqueciSenha(usuario) {
        const url = `${environment.apiBase}autenticacao/confirmarCodigoEsqueciSenha`;
        return this.ajaxService.post<any>(url, usuario);
    }

    async alterarSenhaEsqueciSenha(usuario) {
        const url = `${environment.apiBase}autenticacao/alterarSenhaEsqueciSenha`;
        return this.ajaxService.post<any>(url, usuario);
    }

}
