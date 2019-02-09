import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { AuthService } from '../../service/auth.service';
import { ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/shared/service/local-storage.service';

@Component({
  selector: 'nova-senha-page',
  templateUrl: './nova-senha.page.html',
  styleUrls: ['./nova-senha.component.scss']
})

export class NovaSenhaComponent implements OnInit {

  public formSenha: FormGroup;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public toastController: ToastController,
    public sessionStorage: SessionStorageService,
    public storageService: LocalStorageService,
    public authService: AuthService) { }

  ngOnInit() {
    this.formSenha = this.fb.group({
      senha: this.fb.control('', [Validators.required]),
      confSenha: this.fb.control('', [Validators.required]),
    }, { validator: this.validateSenha });
  }

  proximo() {
    const queryParams = { mensagem: 'Registrando nova senha', titulo: 'Esqueceu Senha', action: 'senha' };
    this.router.navigate(['auth', 'confirmacao'], { queryParams });
  }

  async alterarSenha() {
    const data = {
      usuario: this.sessionStorage.getJson('esqueceu-senha/dados').cpf,
      senha: this.formSenha.value.senha,
      codigoSMS: this.sessionStorage.getJson('esqueceu-senha/codigo-sms').sms
    };
    const avisoErro = await this.toastController.create({
      message: 'Algo deu errado, tente novamente mais tarde!',
      duration: 3000,
      color: 'dark'
    });
    this.authService.alterarSenhaEsqueciSenha(data).then((response) => {
      if (response.sucesso) {
        this.storageService.setJson('user', response.objeto);
        this.proximo();
      } else {
        avisoErro.present();
      }
    });
  }

  public validateSenha(c: FormControl) {
    const senha = c.value.senha;
    const confSenha = c.value.confSenha;
    return senha === confSenha && senha !== '' && confSenha !== '' ? null : { validateSenha: { valid: false } };
  }
}
