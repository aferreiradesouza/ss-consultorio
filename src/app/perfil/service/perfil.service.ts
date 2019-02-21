import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AjaxService } from 'src/shared/service/ajax.service';

@Injectable({
    providedIn: 'root'
})

export class PerfilService {

    constructor(public ajaxService: AjaxService) {}

    async editarPerfil(perfil) {
        const url = `${environment.apiBase}paciente/alterarPerfil`;
        return this.ajaxService.post<any>(url, perfil);
    }

    async verificarToken() {
        const url = `${environment.apiBase}autenticacao/verificarToken`;
        return this.ajaxService.get<any>(url);
    }
}
