import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AjaxService } from 'src/shared/service/ajax.service';

@Injectable()

export class ContatoService {

    constructor(public ajaxService: AjaxService) {}

    async obterConsultorios() {
        const url = `${environment.apiBase}agenda/obterAgendaConsultorios`;
        return this.ajaxService.get<any>(url);
    }
}
