import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AjaxService } from 'src/shared/service/ajax.service';

@Injectable({
    providedIn: 'root'
})

export class TokenService {

    constructor(public ajaxService: AjaxService) {}

    async verificarToken() {
        const url = `${environment.apiBase}autenticacao/verificarToken`;
        return this.ajaxService.get<any>(url);
    }

}
