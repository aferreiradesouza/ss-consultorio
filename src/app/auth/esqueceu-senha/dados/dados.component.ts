import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { AuthService } from '../../service/auth.service';
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';

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
    public authService: AuthService) {}

  ngOnInit() {
    this.formDados = this.fb.group({
      cpf: this.fb.control('', [Validators.required, Validators.minLength(11)]),
      nascimento: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    });
  }

  voltar() {
    this.router.navigate(['auth']);
  }

  gravar() {
      if (this.formDados.valid) {
          this.sessionStorage.setJson('esqueceu-senha/dados', this.formDados.value);
          this.proximo();
      }
  }

  async enviar() {
    const data = {
      cpf: this.formDados.value.cpf,
      dataNascimento: moment(this.formDados.value.nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD')
    };
    const avisoErro = await this.toastController.create({
      message: 'Não foi possível enviar o código. Tente novamente mais tarde!',
      duration: 3000,
      color: 'dark'
    });
    this.authService.gerarCodigoSMS(data).then((response) => {
      if (response.sucesso) {
        this.gravar();
      } else {
        avisoErro.present();
      }
    });
  }

  proximo() {
    this.router.navigate(['auth', 'esqueceu-senha', 'confirmar-sms']);
  }
}
