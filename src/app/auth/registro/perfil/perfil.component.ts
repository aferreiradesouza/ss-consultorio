import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';

@Component({
  selector: 'perfil-page',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {

  public formPerfil: FormGroup;

  constructor(public router: Router, private fb: FormBuilder, public sessionStorage: SessionStorageService) {}

  ngOnInit() {
    this.formPerfil = new FormGroup({
      nome: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      nascimento: this.fb.control('', [Validators.required]),
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
}
