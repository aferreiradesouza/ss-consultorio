import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { AuthService } from '../../service/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'confirmar-sms-page',
  templateUrl: './confirmar-sms.page.html',
  styleUrls: ['./confirmar-sms.component.scss']
})

export class ConfirmarSMSComponent implements OnInit {

  public formSms: FormGroup;

  constructor(public router: Router,
              public fb: FormBuilder,
              public toastController: ToastController,
              public sessionStorage: SessionStorageService,
              public authService: AuthService,
              public loadingController: LoadingController) {}

  ngOnInit() {
    this.formSms = this.fb.group({
      sms: this.fb.control('', [Validators.required]),
    });
  }

  voltar() {
    this.router.navigate(['auth', 'esqueceu-senha', 'dados']);
  }

  gravar() {
    if (this.formSms.valid) {
        this.sessionStorage.setJson('esqueceu-senha/codigo-sms', this.formSms.value);
        this.proximo();
    }
  }

  fechar() {
    sessionStorage.clear();
    this.router.navigate(['auth', 'login']);
  }

  async reenviar() {
    const loading = await this.loadingController.create({
      message: 'Enviando',
    });
    await loading.present();

    const data = {
      cpf: this.sessionStorage.getJson('esqueceu-senha/dados').cpf,
      dataNascimento: moment(this.sessionStorage.getJson('esqueceu-senha/dados').nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD'),
    };
    const avisoSucesso = await this.toastController.create({
      message: 'Código enviado novamente.',
      duration: 2000,
      color: 'dark'
    });
    const avisoErro = await this.toastController.create({
      message: 'Não foi possível enviar o código novamente',
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'Entendi',
    });

    const codigo = await this.authService.reenviarCodigo(data);
    loading.dismiss();

      if (codigo.sucesso) {
        avisoSucesso.present();
      } else {
        avisoErro.present();
      }
  }

  async enviar() {
    const loading = await this.loadingController.create({
      message: 'Enviando',
    });
    await loading.present();

    const data = {
      usuario: this.sessionStorage.getJson('esqueceu-senha/dados').cpf,
      codigoSMS: this.formSms.value.sms
    };
    const avisoErro = await this.toastController.create({
      message: 'Código incorreto.',
      duration: 3000,
      color: 'dark'
    });

    const codigo = await this.authService.confirmarCodigoEsqueciSenha(data);
    loading.dismiss();

      if (codigo.sucesso) {
        this.gravar();
      } else {
        avisoErro.present();
      }
  }

  proximo() {
    this.router.navigate(['auth', 'esqueceu-senha', 'nova-senha']);
  }
}
