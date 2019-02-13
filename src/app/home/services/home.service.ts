import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AjaxService } from 'src/shared/service/ajax.service';
import { Consultas } from 'src/shared/dto';

@Injectable({
    providedIn: 'root'
})

export class HomeService {

    constructor(public ajaxService: AjaxService) {}

    async obterConsultas() {
        const url = `${environment.apiBase}agenda/obterMinhasConsultas`;
        return this.ajaxService.get<Consultas[]>(url);
    }
}
