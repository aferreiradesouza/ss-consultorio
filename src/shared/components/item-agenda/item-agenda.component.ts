import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ss-item-agenda',
  templateUrl: './item-agenda.page.html',
  styleUrls: ['./item-agenda.component.scss']
})
export class ItemAgendaComponent implements OnInit {
  @Input() itens: any[];

  @Output() detalhes = new EventEmitter();

  constructor(public router: Router, public modalController: ModalController) {}

  ngOnInit() {}

  public formatarStatus(codigo) {
    let status;
    if (codigo === 'pre_agendamento') {
      status = 'remove-circle';
    } else if (codigo === 'cancelado') {
      status = 'close-circle';
    } else {
      status = 'checkmark-circle';
    }
    return status;
  }

  public formaterName(name) {
    const nome = name.split(' ');
    return nome[0] + ' ' + nome[1];
  }

  public formaterData(data) {
    const dia = moment(data, 'YYYY-MM-DD').format('DD');
    return dia;
  }

  abrirMapa(consultorio) {
    const endereco =
      consultorio.logradouro +
      ', ' +
      consultorio.numero +
      ', ' +
          consultorio.bairro +
          ', ' +
          consultorio.cidade +
          ' - ' +
          consultorio.estado;

    window.open(
      'https://www.google.com/maps/place/' + endereco,
      '_system',
      'location=yes'
    );
  }  

  public obterDetalhes(objeto) {
    this.detalhes.emit(objeto);
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
