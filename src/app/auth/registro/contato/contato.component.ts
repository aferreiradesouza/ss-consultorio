import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';

@Component({
  selector: 'contato-page',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.component.scss']
})

export class ContatoComponent implements OnInit {

  public formContato: FormGroup;

  constructor(public router: Router, private fb: FormBuilder, public sessionStorage: SessionStorageService) {}

  ngOnInit() {
    this.formContato = this.fb.group({
      telefone: this.fb.control('', [Validators.required, Validators.minLength(10)]),
      celular: this.fb.control('', [Validators.required, Validators.minLength(11)]),
    });

    this.preencherFormulario();
  }

  gravar() {
      if (this.formContato.valid) {
          this.sessionStorage.setJson('registro/contato', this.formContato.value);
          this.proximo();
      }
  }

  proximo() {
    this.router.navigate(['auth', 'registro', 'confirmar-celular']);
  }

  preencherFormulario() {
    if (this.sessionStorage.getJson('registro/contato')) {
      this.formContato.setValue(this.sessionStorage.getJson('registro/contato'));
    }
  }
}
