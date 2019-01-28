import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'confirmar-celular-page',
  templateUrl: './confirmar-celular.page.html',
  styleUrls: ['./confirmar-celular.component.scss']
})

export class ConfirmarCelularComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {}

  ir() {
    this.router.navigate(['auth', 'registro', 'confirmar-sms']);
  }

  voltar() {
    this.router.navigate(['auth', 'registro', 'contato']);
  }
}
