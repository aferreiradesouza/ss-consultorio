import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'perfil-page',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {

  public formPerfil: FormGroup;
  public regexEmail: any = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;

  constructor(public router: Router, private fb: FormBuilder, public sessionStorage: SessionStorageService,
    private statusBar: StatusBar) {}

  ngOnInit() {
    this.formPerfil = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, this.validateEmail]),
      nascimento: this.fb.control('', [Validators.required, Validators.minLength(10)]),
    });

    this.preencherFormulario();
  }

  gravar() {
      if (this.formPerfil.valid) {
          this.sessionStorage.setJson('registro/perfil', this.formPerfil.value);
          this.proximo();
      }
  }

  proximo() {
    this.router.navigate(['auth', 'registro', 'contato']);
  }

  preencherFormulario() {
    if (this.sessionStorage.getJson('registro/perfil')) {
      this.formPerfil.setValue(this.sessionStorage.getJson('registro/perfil'));
    }
  }

  validateEmail(c: FormControl) {
  const emailRagex = /^[A-Za-z0-9.]+@[A-Za-z0-9]+\.[A-Za-z]+(\.[A-Za-z]+)?$/;
  return emailRagex.test(c.value) ? null : {
    validateEmail: {
      valid: false
    }
  };
  }

  fechar() {
    this.statusBar.styleDefault();
    sessionStorage.clear();
    this.router.navigate(['auth']);
  }

  voltar() {
    this.router.navigate(['auth', 'registro', 'conta']);
  }
}
