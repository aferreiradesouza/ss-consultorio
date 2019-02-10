import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { AuthService } from '../service/auth.service';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public formEntrar: FormGroup;
  public loading: boolean;

  constructor(public router: Router,
    private fb: FormBuilder,
    public toastController: ToastController,
    public authService: AuthService,
    public storageService: LocalStorageService,
    public loadingController: LoadingController) {
      this.loading = false;
    }

  ngOnInit() {
    this.formEntrar = this.fb.group({
      cpf: this.fb.control('', [Validators.required, Validators.minLength(11)]),
      senha: this.fb.control('', [Validators.required]),
    });
  }

  async entrar() {
    this.loading = true;
    const data = {
      usuario: this.formEntrar.value.cpf,
      senha: this.formEntrar.value.senha,
    };
    const erro = await this.toastController.create({
      message: 'Conta invalida',
      showCloseButton: true,
      closeButtonText: 'Entendi',
      color: 'dark'
    });
    const login = await this.authService.efetuarLogin(data);
    this.loading = false;
    if (login.sucesso) {
      this.storageService.setJson('user', login.objeto);
      this.router.navigate(['home']);
    } else {
      erro.present();
    }

    // this.authService.efetuarLogin(data).then((response) => {
    //   loading.onDidDismiss();
    //   if (response.sucesso) {
    //     this.storageService.setJson('user', response.objeto);
    //     this.router.navigate(['home']);
    //   } else {
    //     erro.present();
    //   }
    // });
  }

  esqueceuSenha() {
    this.router.navigate(['auth', 'esqueceu-senha']);
  }

  voltar() {
    this.router.navigate(['auth']);
  }
}
