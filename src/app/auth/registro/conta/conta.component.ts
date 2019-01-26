import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'conta-page',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.component.scss']
})

export class ContaComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {}

  voltar() {
    this.router.navigate(['auth']);
  }

  ir() {
    this.router.navigate(['auth', 'registro', 'perfil']);
  }
}
