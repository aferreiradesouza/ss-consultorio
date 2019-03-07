import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilHomeService {
  constructor() {}

  async formatarConsultas(dados: any[], tipo: string) {
    const dataAtual = new Date();
    const proximas = [];
    const finalizadas = [];

    dados.forEach(f => {
      const diaAtual =
        moment(dataAtual).format('YYYY-MM-DD') +
        'T' +
        moment(dataAtual).format('HH:mm:ss');
      const data = moment(f.data).format('YYYY-MM-DD');
      const consulta = `${data}T${f.hora}:00`;

      if (diaAtual > consulta || f.statusConsulta.codigo === 'cancelado') {
        finalizadas.push(f);
      } else {
        proximas.push(f);
      }
    });

    if (tipo === 'proximas') {
      proximas.sort(function(a, b) {
        const dataA: any = new Date(
          new Date(a.data).getFullYear(),
          new Date(a.data).getMonth(),
          new Date(a.data).getDate()
        );
        const dataB: any = new Date(
          new Date(b.data).getFullYear(),
          new Date(b.data).getMonth(),
          new Date(b.data).getDate()
        );
        return dataA - dataB;
      });
    } else {
      finalizadas.sort(function(a, b) {
        const dataA: any = new Date(
          new Date(a.data).getFullYear(),
          new Date(a.data).getMonth(),
          new Date(a.data).getDate()
        );
        const dataB: any = new Date(
          new Date(b.data).getFullYear(),
          new Date(b.data).getMonth(),
          new Date(b.data).getDate()
        );
        return dataB - dataA;
      });
    }

    return tipo === 'proximas' ? proximas : finalizadas;
  }
}
