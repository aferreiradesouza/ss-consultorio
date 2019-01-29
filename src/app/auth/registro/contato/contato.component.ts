import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'contato-page',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.component.scss']
})

export class ContatoComponent implements OnInit {

  public customPatterns = {'0': { pattern: new RegExp('\[0-9\]')}};

  constructor(public router: Router) {}

  ngOnInit() {
  }

  ir() {
    this.router.navigate(['auth', 'registro', 'confirmar-celular']);
  }
}
