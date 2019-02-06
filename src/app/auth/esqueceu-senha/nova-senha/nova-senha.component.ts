import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'nova-senha-page',
  templateUrl: './nova-senha.page.html',
  styleUrls: ['./nova-senha.component.scss']
})

export class NovaSenhaComponent implements OnInit {

  public formSenha: FormGroup;

  constructor(public router: Router, public fb: FormBuilder) {}

  ngOnInit() {
    this.formSenha = this.fb.group({
      senha: this.fb.control('', [Validators.required]),
      confSenha: this.fb.control('', [Validators.required]),
    }, { validator: this.validateSenha });
  }

  enviar() {
    this.router.navigate(['auth', 'esqueceu-senha', 'dados']);
  }

  public validateSenha(c: FormControl) {
    const senha = c.value.senha;
    const confSenha = c.value.confSenha;
    return senha === confSenha && senha !== '' && confSenha !== '' ? null : { validateSenha: { valid: false } };
  }
}
