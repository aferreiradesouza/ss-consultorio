import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { AuthService } from '../../service/auth.service';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'confirmar-sms-page',
  templateUrl: './confirmar-sms.page.html',
  styleUrls: ['./confirmar-sms.component.scss']
})

export class ConfirmarSMSComponent implements OnInit {

  public formSms: FormGroup;

  constructor(public router: Router,
    private fb: FormBuilder,
    public sessionStorage: SessionStorageService,
    public toastController: ToastController,
    public authService: AuthService,
    public storageService: LocalStorageService) {}

  ngOnInit() {
    this.formSms = new FormGroup({
      sms: this.fb.control('', [Validators.required]),
    });
  }

  voltar() {
    this.router.navigate(['auth']);
  }

  async enviar() {
    const data = {
      senha: this.pegarSenha,
      usuario: this.pegarCpf,
      codigoSMS: this.formSms.value.sms
    };

    const erro = await this.toastController.create({
      message: 'Código incorreto.',
      duration: 2000,
      color: 'dark'
    });

    this.authService.efetuarLogin(data).then((response) => {
      if (response.sucesso) {
        this.storageService.setJson('user', response.objeto);
        this.proximo();
      } else {
        erro.present();
      }
    });
  }

  proximo() {
    const queryParams = {mensagem: 'Registrando', titulo: 'Registro', action: 'registro'};
    this.router.navigate(['auth', 'confirmacao'], { queryParams });
  }

  async reenviar() {
    const data = {
      cpf: this.pegarCpf,
      dataNascimento: moment(this.pegarNascimento, 'DD-MM-YYYY').format('YYYY-MM-DD'),
    };
    const avisoSucesso = await this.toastController.create({
      message: 'Código enviado novamente.',
      duration: 2000,
      color: 'dark'
    });
    const avisoErro = await this.toastController.create({
      message: 'Não foi possível enviar novamente',
      duration: 2000,
      color: 'dark'
    });
    this.authService.reenviarCodigo(data).then((response) => {
      if (response.sucesso) {
        avisoSucesso.present();
      } else {
        avisoErro.present();
      }
    });
  }

  public get pegarCpf() {
    return this.sessionStorage.getJson('registro/conta').cpf;
  }

  public get pegarSenha() {
    return this.sessionStorage.getJson('registro/conta').senha;
  }

  public get pegarNascimento() {
    return this.sessionStorage.getJson('registro/perfil').nascimento;
  }
}
