import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'conta-page',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.component.scss']
})

export class ContaComponent implements OnInit {

  public formValidacaoCpf: string;
  public formValidacaoSenha: string;
  public formValidacaoCSenha: string;
  public dados: any = {};
  public cpf: string;

  constructor(public router: Router) {}

  ngOnInit() {}

  voltar() {
    this.router.navigate(['auth']);

    this.formValidacaoCpf = 'false';
    this.formValidacaoSenha = 'false';
  }

  ir() {
    this.router.navigate(['auth', 'registro', 'perfil']);
  }

  verificarCPF(dados) {
    if (dados.cpf.length === 14) {
      this.formValidacaoCpf = 'true';
      console.log('1');
    } else {
      this.formValidacaoCpf = undefined;
      console.log('2');
    }
  }

  verificarSenha(dados) {
    if (dados.senha === dados.csenha && dados.senha !== '' && dados.csenha !== '') {
      this.formValidacaoSenha = 'true';
    } else {
      this.formValidacaoSenha = undefined;
    }
  }

  action(dados) {
    console.log(dados);
  }
}
