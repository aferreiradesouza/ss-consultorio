import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  NavController
} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { AuthService } from '../../service/auth.service';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import * as moment from 'moment';
import { IConfirmarSms } from 'src/shared/dto';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'confirmar-sms-page',
  templateUrl: './confirmar-sms.page.html',
  styleUrls: ['./confirmar-sms.component.scss']
})
export class ConfirmarSMSComponent implements OnInit {
  public data: IConfirmarSms;
  public formSms: FormGroup;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public sessionStorage: SessionStorageService,
    public toastController: ToastController,
    public authService: AuthService,
    public storageService: LocalStorageService,
    public route: ActivatedRoute,
    public loadingController: LoadingController,
    public navController: NavController,
    private statusBar: StatusBar
  ) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['data'];
    this.formSms = new FormGroup({
      sms: this.fb.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  voltar() {
    this.router.navigate(['auth']);
  }

  fechar() {
    this.statusBar.styleDefault();
    sessionStorage.clear();
    this.router.navigate(['auth']);
  }

  async enviar() {
    if (this.data.action) {
      const loading = await this.loadingController.create({
        message: 'Enviando'
      });
      await loading.present();
      const data = {
        usuario: this.data.usuario,
        senha: this.data.senha,
        codigoSMS: this.formSms.value.sms
      };

      try {
        const login = await this.authService.efetuarLogin(data);
        if (login.sucesso) {
          this.storageService.setJson('user', login.objeto);
          this.router.navigate(['home']);
        } else {
          const erro = await this.toastController.create({
            message: login.mensagens[0] || 'Algo de errado aconteceu',
            color: 'dark',
            showCloseButton: true,
            closeButtonText: 'Entendi'
          });
          erro.present();
        }
      } catch (err) {
        const erro = await this.toastController.create({
          message: 'Algo de errado aconteceu',
          color: 'dark',
          showCloseButton: true,
          closeButtonText: 'Entendi'
        });
        erro.present();
      } finally {
        loading.dismiss();
      }
    } else {
      const loading = await this.loadingController.create({
        message: 'Enviando'
      });
      await loading.present();
      const data = {
        senha: this.pegarSenha,
        usuario: this.pegarCpf,
        codigoSMS: this.formSms.value.sms
      };

      try {
        const login = await this.authService.efetuarLogin(data);

        if (login.sucesso) {
          this.sessionStorage.remove('registro/contato');
          this.sessionStorage.remove('registro/conta');
          this.sessionStorage.remove('registro/perfil');
          this.storageService.setJson('user', login.objeto);
          const queryParams = {
            mensagem: 'Registrando',
            titulo: 'Registro',
            action: 'registro'
          };
          this.router.navigate(['auth', 'confirmacao'], { queryParams });
        } else {
          const erro = await this.toastController.create({
            message: login.mensagens[0] || 'Algo de errado aconteceu',
            color: 'dark',
            showCloseButton: true,
            closeButtonText: 'Entendi'
          });
          erro.present();
        }
      } catch (err) {
        const erro = await this.toastController.create({
          message: 'Algo de errado aconteceu',
          color: 'dark',
          showCloseButton: true,
          closeButtonText: 'Entendi'
        });
        erro.present();
      } finally {
        loading.dismiss();
      }
    }
  }

  proximo() {
    const queryParams = {
      mensagem: 'Registrando',
      titulo: 'Registro',
      action: 'registro'
    };
    this.router.navigate(['auth', 'confirmacao'], { queryParams });
  }

  async reenviar() {
    const loading = await this.loadingController.create({
      message: 'Enviando'
    });
    loading.present();
    if (this.data.action) {
      const data = {
        cpf: this.data.usuario,
        dataNascimento: this.data.nascimento
      };
      const avisoSucesso = await this.toastController.create({
        message: 'Código enviado novamente.',
        duration: 2000,
        color: 'dark'
      });
      const avisoErro = await this.toastController.create({
        message: 'Não foi possível enviar novamente',
        color: 'dark',
        showCloseButton: true,
        closeButtonText: 'Entendi'
      });
      try {
        const sms = await this.authService.reenviarCodigo(data);
        if (sms.sucesso) {
          avisoSucesso.present();
        } else {
          avisoErro.present();
        }
      } catch (err) {
        avisoErro.present();
      } finally {
        loading.dismiss();
      }
    } else {
      const data = {
        cpf: this.pegarCpf,
        dataNascimento: moment(this.pegarNascimento, 'DD-MM-YYYY').format(
          'YYYY-MM-DD'
        )
      };
      const avisoSucesso = await this.toastController.create({
        message: 'Código enviado novamente.',
        duration: 2000,
        color: 'dark'
      });
      const avisoErro = await this.toastController.create({
        message: 'Não foi possível enviar novamente',
        color: 'dark',
        showCloseButton: true,
        closeButtonText: 'Entendi'
      });
      try {
        const sms = await this.authService.reenviarCodigo(data);
        if (sms.sucesso) {
          avisoSucesso.present();
        } else {
          avisoErro.present();
        }
      } catch (err) {
        avisoErro.present();
      } finally {
        loading.dismiss();
      }
    }
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
