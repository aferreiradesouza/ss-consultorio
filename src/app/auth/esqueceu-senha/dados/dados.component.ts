import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';

@Component({
  selector: 'dados-page',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.component.scss']
})

export class DadosComponent implements OnInit {

  public formDados: FormGroup;

  constructor(public router: Router, public fb: FormBuilder, public sessionStorage: SessionStorageService) {}

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

  proximo() {
    this.router.navigate(['auth', 'esqueceu-senha', 'confirmar-sms']);
  }
}
