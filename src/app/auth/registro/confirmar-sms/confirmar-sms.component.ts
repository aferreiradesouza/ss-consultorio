import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';

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
    public toastController: ToastController) {}

  ngOnInit() {
    this.formSms = new FormGroup({
      sms: this.fb.control('', [Validators.required]),
    });
  }

  voltar() {
    this.router.navigate(['auth']);
  }

  gravar() {
      if (this.formSms.valid) {
          this.sessionStorage.setJson('registro/codigo-sms', this.formSms.value);
          this.proximo();
      }
  }

  proximo() {
    const queryParams = {mensagem: 'Registrando', titulo: 'Registro'};
    this.router.navigate(['auth', 'confirmacao'], { queryParams });
  }

  async reenviar() {
    const toast = await this.toastController.create({
      message: 'SMS enviado novamente.',
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }
}
