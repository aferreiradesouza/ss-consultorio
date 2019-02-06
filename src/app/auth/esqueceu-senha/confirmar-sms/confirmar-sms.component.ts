import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SessionStorageService } from 'src/shared/service/session-storage.service';

@Component({
  selector: 'confirmar-sms-page',
  templateUrl: './confirmar-sms.page.html',
  styleUrls: ['./confirmar-sms.component.scss']
})

export class ConfirmarSMSComponent implements OnInit {

  public formSms: FormGroup;

  constructor(public router: Router, public fb: FormBuilder, public sessionStorage: SessionStorageService) {}

  ngOnInit() {
    this.formSms = this.fb.group({
      sms: this.fb.control('', [Validators.required]),
    });
  }

  voltar() {
    this.router.navigate(['auth']);
  }

  gravar() {
    if (this.formSms.valid) {
        this.sessionStorage.setJson('esqueceu-senha/codigo-sms', this.formSms.value);
        this.proximo();
    }
  }

  proximo() {
    this.router.navigate(['auth', 'esqueceu-senha', 'nova-senha']);
  }
}
