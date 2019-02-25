import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-accordion',
  templateUrl: './accordion.page.html',
  styleUrls: ['./accordion.component.scss']
})

export class AccordionComponent implements OnInit {
  public maskTelefone = ['(00) 0000-0000'];

  public itemSelecionado: any;

  @Input() itens: any[];

  constructor(public router: Router) {}

  ngOnInit() {
    this.itemSelecionado = this.itens[0].consultorio;
  }

  selecionarItem(consultorio) {
    if (consultorio === this.itemSelecionado) {
      this.itemSelecionado = null;
    } else {
      this.itemSelecionado = consultorio;
    }
  }
}
