import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-accordion-agendar',
  templateUrl: './accordion-agendar.page.html',
  styleUrls: ['./accordion-agendar.component.scss']
})

export class AccordionAgendarComponent implements OnInit {
  public medicoSelecionado: any;
  public lugarSelecionado: any;

  @Input() itens: any[];

  constructor(public router: Router) {}

  ngOnInit() {
  }

  selecionarItem(consultorio) {
    if (consultorio === this.medicoSelecionado) {
      this.medicoSelecionado = null;
    } else {
      this.medicoSelecionado = consultorio;
    }
  }

  selecionarLugar(lugar) {
    if (lugar === this.lugarSelecionado) {
      this.lugarSelecionado = null;
    } else {
      this.lugarSelecionado = lugar;
    }
  }
}
