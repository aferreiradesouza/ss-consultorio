import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { AuthService } from '../../service/auth.service';
import * as moment from 'moment';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'dados-page',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.component.scss']
})

export class DadosComponent implements OnInit {

  public formDados: FormGroup;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public toastController: ToastController,
    public sessionStorage: SessionStorageService,
    public authService: AuthService,
    public loadingController: LoadingController,
    public navController: NavController) {}

  ngOnInit() {
    this.formDados = this.fb.group({
      cpf: this.fb.control('', [Validators.required, Validators.minLength(11)]),
      nascimento: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    });
    this.preencherFormulario();
  }

  voltar() {
    this.router.navigate(['auth']);
  }

  fechar() {
    sessionStorage.clear();
    this.router.navigate(['auth', 'login']);
  }

  gravar() {
      if (this.formDados.valid) {
          this.sessionStorage.setJson('esqueceu-senha/dados', this.formDados.value);
          this.proximo();
      }
  }

  async enviar() {
    const loading = await this.loadingController.create({
      message: 'Enviando',
    });
    await loading.present();
    const data = {
      cpf: this.formDados.value.cpf,
      dataNascimento: moment(this.formDados.value.nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD')
    };
    const codigo = await this.authService.gerarCodigoSMS(data);
    loading.dismiss();
      if (codigo.sucesso) {
        this.gravar();
      } else {
        const avisoErro = await this.toastController.create({
          message: codigo.mensagens[0],
          color: 'dark',
          showCloseButton: true,
          closeButtonText: 'Entendi'
        });
        avisoErro.present();
      }
    }

  proximo() {
    this.router.navigate(['auth', 'esqueceu-senha', 'confirmar-sms']);
  }

  preencherFormulario() {
    if (this.sessionStorage.getJson('esqueceu-senha/dados')) {
      this.formDados.setValue(this.sessionStorage.getJson('esqueceu-senha/dados'));
    }
  }
}
