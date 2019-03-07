import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/shared/service/session-storage.service';

@Component({
  selector: 'ss-accordion-agendar',
  templateUrl: './accordion-agendar.page.html',
  styleUrls: ['./accordion-agendar.component.scss']
})

export class AccordionAgendarComponent implements OnInit {

  public medicoSelecionado: any;
  public lugarSelecionado: any;

  @Input() itens: any[];
  @Input() permitirAbrir: boolean;

  @Output() select = new EventEmitter();

  constructor(public router: Router, public sessionStorage: SessionStorageService) { }

  ngOnInit() {
    if (this.itens.length === 1) {
      this.medicoSelecionado = this.itens[0];

      if (this.medicoSelecionado.locais.length === 1) {
        this.lugarSelecionado = this.medicoSelecionado.locais[0];
      }
    }
  }

  selecionarItem(consultorio) {
    if (consultorio === this.medicoSelecionado) {
      this.medicoSelecionado = null;
    } else {
      this.medicoSelecionado = consultorio;
    }
    const obj = null;
    this.select.emit(obj);
  }

  selecionarLugar(lugar) {
    if (lugar === this.lugarSelecionado) {
      this.lugarSelecionado = null;
    } else {
      this.lugarSelecionado = lugar;
    }
    const obj = null;
    this.select.emit(obj);
  }

  selecionarHorario(item) {
    const especialidade = this.sessionStorage.getJson('agendar-consulta/especialidadeObj');
    const data = this.sessionStorage.getJson('agendar-consulta/data-consulta');

    const obj = { local: this.lugarSelecionado.local,
      idLocal: this.lugarSelecionado.idLocal,
      medico: this.medicoSelecionado.medico,
      idMedico: this.medicoSelecionado.idMedico,
      urlFotoMedico: this.medicoSelecionado.url,
      urlFotoLocal: this.lugarSelecionado.urlFoto,
      horario: item,
      especialidade: especialidade.nome,
      dia: data.dataCompleta
    };
    this.select.emit(obj);
  }
}
