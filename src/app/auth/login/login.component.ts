import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public formEntrar: FormGroup;

  constructor(public router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.formEntrar = new FormGroup({
      cpf: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required]),
    });
  }

  voltar() {
    this.router.navigate(['auth']);
  }
}
