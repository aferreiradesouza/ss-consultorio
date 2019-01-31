import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'conta-page',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.component.scss']
})

export class ContaComponent implements OnInit {

  public form = new FormGroup({
    cpf: new FormControl('123'),
    senha: new FormControl(''),
    confSenha: new FormControl(''),
  });

  constructor(public router: Router) {}

  ngOnInit() {
    console.log(this.form.value);
  }

  voltar() {
    this.router.navigate(['auth']);
  }

  ir() {
    // this.router.navigate(['auth', 'registro', 'perfil']);
    console.log(this.form.value);
  }
}
