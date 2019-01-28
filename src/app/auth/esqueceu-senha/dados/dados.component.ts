import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dados-page',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.component.scss']
})

export class DadosComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {}

  voltar() {
    this.router.navigate(['auth']);
  }

  ir() {
    this.router.navigate(['auth', 'esqueceu-senha', 'confirmar-sms']);
  }
}
