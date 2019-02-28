import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import * as moment from 'moment';
import { AuthService } from '../../service/auth.service';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'confirmar-celular-page',
  templateUrl: './confirmar-celular.page.html',
  styleUrls: ['./confirmar-celular.component.scss']
})
export class ConfirmarCelularComponent implements OnInit {
  public maskCelular = ['(00) 00000-0000'];

  constructor(
    public router: Router,
    public sessionStorage: SessionStorageService,
    public authService: AuthService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public navController: NavController
  ) {}

  ngOnInit() {}

  async ir() {
    const loading = await this.loadingController.create({
      message: 'Enviando'
    });
    await loading.present();

    const data = {
      cpf: this.registro_conta.cpf,
      email: this.registro_perfil.email,
      dataNascimento: moment(
        this.registro_perfil.nascimento,
        'DD-MM-YYYY'
      ).format('YYYY-MM-DD'),
      nome: this.registro_perfil.nome,
      celular: this.registro_contato.celular,
      telefone: this.registro_contato.telefone,
      senha: this.registro_conta.senha
    };

    const login = await this.authService.registro(data);
    loading.dismiss();
    if (login.sucesso) {
      this.router.navigate(['auth', 'registro', 'confirmar-sms']);
    } else {
      if (login.mensagens) {
        const erro = await this.toastController.create({
          message: login.mensagens[0],
          color: 'dark',
          showCloseButton: true,
          closeButtonText: 'Entendi'
        });
        erro.present();
      } else {
        const erro = await this.toastController.create({
          message: 'Algo de errado aconteceu',
          color: 'dark',
          showCloseButton: true,
          closeButtonText: 'Entendi'
        });
        erro.present();
      }
    }
  }

  public get preencherTelefone() {
    return this.sessionStorage.getJson('registro/contato').celular || '';
  }

  voltar() {
    this.navController.pop();
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
