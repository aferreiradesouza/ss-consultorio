import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { timer } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfilService } from '../service/perfil.service';

@Component({
  selector: 'editar-page',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.component.scss']
})

export class EditarComponent implements OnInit {

  public formEmail = new FormGroup({
    email: new FormControl('', [Validators.required, this.validateEmail]),
  });
  public formCelular = new FormGroup({
    celular: new FormControl('', [Validators.required, Validators.minLength(11)]),
  });
  public formSenha = new FormGroup({
    senha: new FormControl(''),
    confSenha: new FormControl(''),
  }, { validators: this.validateSenha });

  @Input() title: any;
  @Input() label: any;
  @Input() action: any;

  constructor(public router: Router,
    public modalController: ModalController,
    public storageService: LocalStorageService,
    public route: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public perfilService: PerfilService) {
  }

  ngOnInit() {

  }

  close() {
    this.modalController.dismiss({
      'result': 'fechar'
    });
  }

  async editar(form) {
    const loading = await this.loadingController.create({
      message: 'Alterando',
    });
    const toastSucesso = await this.toastController.create({
      message: 'Alterado com sucesso',
      duration: 3000,
      color: 'dark'
    });
    const toastErro = await this.toastController.create({
      message: 'Algo de errado aconteceu',
      duration: 3000,
      color: 'dark',
      showCloseButton: true,
      closeButtonText: 'Entendi'
    });

    await loading.present();
      const formulario = this.action === 'senha' ? { senha: form.senha } : form;
      const perfilAlterado = await this.perfilService.editarPerfil(formulario);
      if (perfilAlterado.sucesso) {
        const usuario = await this.perfilService.verificarToken();
        this.storageService.setJson('user', usuario.objeto);
        await loading.dismiss();
        this.close();
        toastSucesso.present();
      } else {
        await loading.dismiss();
        toastErro.present();
      }
  }

  validateEmail(c: FormControl) {
    const emailRagex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;
    return emailRagex.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  public validateSenha(c: FormControl) {
    const senha = c.value.senha;
    const confSenha = c.value.confSenha;
    return senha === confSenha && senha !== '' && confSenha !== '' ? null : { validateSenha: { valid: false } };
  }
}
