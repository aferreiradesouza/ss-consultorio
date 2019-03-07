import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { AuthService } from '../service/auth.service';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public formEntrar: FormGroup;

  constructor(public router: Router,
    private fb: FormBuilder,
    public toastController: ToastController,
    public authService: AuthService,
    public storageService: LocalStorageService,
    public loadingController: LoadingController,
    public navController: NavController) { }

  ngOnInit() {
    this.formEntrar = this.fb.group({
      cpf: this.fb.control('', [Validators.required, Validators.minLength(11)]),
      senha: this.fb.control('', [Validators.required]),
    });
  }

  async entrar() {
    const loading = await this.loadingController.create({
      message: 'Entrando',
    });
    await loading.present();

    const data = {
      usuario: this.formEntrar.value.cpf,
      senha: this.formEntrar.value.senha,
    };


    try {
      const login = await this.authService.efetuarLogin(data);
      loading.dismiss();
      if (login.sucesso) {
        this.storageService.setJson('user', login.objeto);
        this.router.navigate(['home']);
      } else {
        if (login.codigo === 'smsnaoconfirmado') {
          const queryParams = { usuario: data.usuario, senha: data.senha, action: 'smsNaoConfirmado', nascimento: login.mensagens[2] };
          this.router.navigate(['auth', 'registro', 'confirmar-sms'], { queryParams });
        } else {
          const erro = await this.toastController.create({
            message: login.mensagens[0],
            color: 'dark',
            showCloseButton: true,
            closeButtonText: 'Entendi'
          });
          erro.present();
        }
      }
    } catch (err) {
      console.log(err);
      loading.dismiss();
      const erro = await this.toastController.create({
        message: 'Algo de errado aconteceu',
        color: 'dark',
        showCloseButton: true,
        closeButtonText: 'Entendi'
      });
      erro.present();
    }
  }

  esqueceuSenha() {
    this.router.navigate(['auth', 'esqueceu-senha']);
  }

  voltar() {
    this.router.navigate(['auth']);
  }
}
