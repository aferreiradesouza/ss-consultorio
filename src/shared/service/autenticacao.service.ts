import { Injectable } from '@angular/core';
import { AjaxService } from 'src/shared/service/ajax.service';
import { TokenService } from './token.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})

export class AutenticacaoService {

    constructor(public ajaxService: AjaxService,
                public tokenService: TokenService,
                public storageService: LocalStorageService) { }

    async verificarToken() {
        const token = await this.tokenService.verificarToken();
        if (token.sucesso) {
            this.storageService.setJson('user', token.objeto);
        }
        return token.sucesso;
    }
}
