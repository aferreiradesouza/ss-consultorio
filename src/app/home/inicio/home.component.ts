import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public menu: any[];

  constructor(public router: Router) {
    this.menu = [
      {label: 'Agendar consulta', icon: 'create', url: 'agendar-consulta'},
      {label: 'Cancelar consulta', icon: 'close-circle', url: 'cancelar-consulta'},
      {label: 'Alterar perfil', icon: 'contact', url: 'alterar-perfil'},
    ];
  }

  ngOnInit() {}
}
