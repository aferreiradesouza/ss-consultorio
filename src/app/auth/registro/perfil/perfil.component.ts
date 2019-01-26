import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'perfil-page',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {}

  voltar() {
    this.router.navigate(['auth']);
  }

  ir() {
    this.router.navigate(['auth', 'registro', 'contato']);
  }
}
