import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})

export class UtilHomeService {

    constructor() { }

    async formatarConsultas(dados: any[], tipo: string) {
        const dataAtual = new Date();
        const proximas = [];
        const finalizadas = [];

        dados.forEach(f => {
            const diaAtual = moment(dataAtual).format('YYYY-MM-DD') + 'T' + moment(dataAtual).format('LTS');
            const data = moment(f.data).format('YYYY-MM-DD');
            const consulta = `${data}T${f.hora}:00`;

            if (diaAtual > consulta || f.statusConsulta.codigo === 'cancelado') {
                finalizadas.push(f);
            } else {
                proximas.push(f);
            }
        });

        console.log(proximas);

        return tipo === 'proximas' ? proximas : finalizadas;
    }
}
