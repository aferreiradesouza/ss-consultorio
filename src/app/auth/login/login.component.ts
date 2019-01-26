import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {}

  voltar() {
    this.router.navigate(['auth']);
  }
}
