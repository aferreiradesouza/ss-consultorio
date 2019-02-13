import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'ss-item-agenda',
  templateUrl: './item-agenda.page.html',
  styleUrls: ['./item-agenda.component.scss']
})

export class ItemAgendaComponent implements OnInit {

  @Input() itens: any[];

  constructor(public router: Router) {}

  ngOnInit() {
  }

  public formaterName(name) {
    const regex = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}?)/;
    return name.match(regex)[0];
  }

  public formaterData(data) {
    const dia = moment(data, 'YYYY-MM-DD').format('DD');
    return dia;
  }

  public formaterMes(data) {
    const mes = parseInt(moment(data, 'YYYY-MM-DD').format('MM'), 10);
    let mesFormatado;
    switch (mes - 1) {
      case 0:
      mesFormatado = 'Janeiro';
        break;
      case 1:
      mesFormatado = 'Fevereiro';
        break;
      case 2:
      mesFormatado = 'Março';
        break;
      case 3:
      mesFormatado = 'Abril';
        break;
      case 4:
      mesFormatado = 'maio';
        break;
      case 5:
      mesFormatado = 'Junho';
        break;
      case 6:
      mesFormatado = 'Julho';
        break;
      case 7:
      mesFormatado = 'Agosto';
        break;
      case 8:
      mesFormatado = 'Setembro';
        break;
      case 9:
      mesFormatado = 'Outubro';
        break;
      case 10:
      mesFormatado = 'Novembro';
        break;
      case 11:
      mesFormatado = 'Dezembro';
        break;
    }
    return mesFormatado;
  }
}
