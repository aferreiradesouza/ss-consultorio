import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-validacao',
  templateUrl: './validacao.page.html',
  styleUrls: ['./validacao.component.scss']
})

export class ValidacaoComponent implements OnInit {

  @Input() validacao: boolean;

  constructor(public router: Router) {}

  ngOnInit() {
  }
}
