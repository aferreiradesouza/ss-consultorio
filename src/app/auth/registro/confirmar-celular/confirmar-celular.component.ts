import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import * as moment from 'moment';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'confirmar-celular-page',
  templateUrl: './confirmar-celular.page.html',
  styleUrls: ['./confirmar-celular.component.scss']
})

export class ConfirmarCelularComponent implements OnInit {

  public maskCelular = ['(00) 00000-0000'];

  constructor(public router: Router, public sessionStorage: SessionStorageService, public authService: AuthService) {}

  ngOnInit() {}

  ir() {
    const data = {
      cpf: this.registro_conta.cpf,
      email: this.registro_perfil.email,
      dataNascimento: moment(this.registro_perfil.nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      nome: this.registro_perfil.nome,
      celular: this.registro_contato.celular,
      telefone: this.registro_contato.telefone,
      senha: this.registro_conta.senha
    };
    console.log(data);
    this.authService.registro(data).then((response) => {
      this.router.navigate(['auth', 'registro', 'confirmar-sms']);
    }).catch((response) => {
      console.log(response);
    });
  }

  public get preencherTelefone() {
    return this.sessionStorage.getJson('registro/contato').celular;
  }

  voltar() {
    this.router.navigate(['auth', 'registro', 'contato']);
  }

  public get registro_conta() {
    return this.sessionStorage.getJson('registro/conta');
  }

  public get registro_contato() {
    return this.sessionStorage.getJson('registro/contato');
  }

  public get registro_perfil() {
    return this.sessionStorage.getJson('registro/perfil');
  }
}
