import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/shared/service/session-storage.service';

@Component({
  selector: 'confirmar-celular-page',
  templateUrl: './confirmar-celular.page.html',
  styleUrls: ['./confirmar-celular.component.scss']
})

export class ConfirmarCelularComponent implements OnInit {

  public maskCelular = ['(00) 00000-0000'];

  constructor(public router: Router, public sessionStorage: SessionStorageService) {}

  ngOnInit() {}

  ir() {
    this.router.navigate(['auth', 'registro', 'confirmar-sms']);
  }

  public get preencherTelefone() {
    return this.sessionStorage.getJson('registro/contato').celular;
  }

  voltar() {
    this.router.navigate(['auth', 'registro', 'contato']);
  }
}
