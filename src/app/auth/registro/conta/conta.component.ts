import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';

@Component({
  selector: 'conta-page',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.component.scss']
})

export class ContaComponent implements OnInit {

  public formConta: FormGroup;

  constructor(public router: Router, private fb: FormBuilder, public sessionStorage: SessionStorageService) {}

  ngOnInit() {
    this.formConta = new FormGroup({
      cpf: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required]),
      confSenha: this.fb.control('', [Validators.required]),
    });

    this.preencherFormulario();
  }

  voltar() {
    this.router.navigate(['auth']);
  }

  gravar() {
      if (this.formConta.valid) {
          this.sessionStorage.setJson('registro/conta', this.formConta.value);
          this.proximo();
      }
  }

  proximo() {
    this.router.navigate(['auth', 'registro', 'perfil']);
  }

  preencherFormulario() {
    if (this.sessionStorage.getJson('registro/conta')) {
      this.formConta.setValue(this.sessionStorage.getJson('registro/conta'));
    }
  }
}
