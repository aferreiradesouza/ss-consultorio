import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(public router: Router, private statusBar: StatusBar) {
    statusBar.styleDefault();
  }

  ngOnInit() {}

  registro() {
    this.statusBar.styleBlackOpaque();
    this.router.navigate(['auth', 'registro']);
  }

  login() {
    this.statusBar.styleBlackOpaque();
    this.router.navigate(['auth', 'login']);
  }
}
