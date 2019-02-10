import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public menu: any[];
  public tabs: any[];
  public itens: any[];

  constructor(public router: Router, public storageService: LocalStorageService) {
    this.menu = [
      {label: 'Agendar consulta', icon: 'create', url: 'agendar-consulta'},
      {label: 'Cancelar consulta', icon: 'close-circle', url: 'cancelar-consulta'},
      {label: 'Alterar perfil', icon: 'contact', url: 'alterar-perfil'},
    ];

    this.tabs = [
      {label: 'Próximas consultas', id: '1'},
      {label: 'Consultas anteriores', id: '2'}
    ];

    this.itens = [
      {medico: 'Andre Domarco'},
      {medico: 'Arthur Ferreira'},
      {medico: 'Rafael Silveira'},
    ];
  }

  ngOnInit() {}

  deslogar() {
    this.storageService.setJson('user', []);
    this.router.navigate(['auth']);
  }
}
