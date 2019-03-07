import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'conta-page',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.component.scss']
})

export class ContaComponent implements OnInit {

  public formConta: FormGroup;

  constructor(public router: Router, private fb: FormBuilder,
    public sessionStorage: SessionStorageService,
    public navController: NavController) {}

  ngOnInit() {
    this.formConta = this.fb.group({
      cpf: this.fb.control('', [Validators.required, Validators.minLength(11)]),
      senha: this.fb.control('', [Validators.required]),
      confSenha: this.fb.control('', [Validators.required]),
    }, { validator: this.validateSenha});

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

  fechar() {
    sessionStorage.clear();
    this.router.navigate(['auth']);
  }

  public validateSenha(c: FormControl) {
    const senha = c.value.senha;
    const confSenha = c.value.confSenha;
    return senha === confSenha && senha !== '' && confSenha !== '' ? null : { validateSenha: { valid: false } };
  }
}
