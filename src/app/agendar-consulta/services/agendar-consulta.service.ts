import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AjaxService } from 'src/shared/service/ajax.service';
import { Consultorios, DiaConsulta } from 'src/shared/dto';

@Injectable()

export class AgendarConsultaService {
    constructor(public ajaxService: AjaxService) {}

    obterConsultorios() {
        const url = `${environment.apiBase}agenda/obterAgendaConsultorios`;
        return this.ajaxService.get<Consultorios>(url);
    }

    obterDiasConsulta(data) {
        const url = `${environment.apiBase}agenda/obterHorariosDisponiveis`;
        return this.ajaxService.post<DiaConsulta>(url, data);
    }

    criarConsulta(data) {
        const url = `${environment.apiBase}agenda/criarConsulta`;
        return this.ajaxService.post<any>(url, data);
    }
}
