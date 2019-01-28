import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nova-senha-page',
  templateUrl: './nova-senha.page.html',
  styleUrls: ['./nova-senha.component.scss']
})

export class NovaSenhaComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {}

  ir() {
    this.router.navigate(['auth', 'esqueceu-senha', 'dados']);
  }
}
