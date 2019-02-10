import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {}

  registro() {
    this.router.navigate(['auth', 'registro']);
  }

  login() {
    this.router.navigate(['auth', 'login']);
  }
}
