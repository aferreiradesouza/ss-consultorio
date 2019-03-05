import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-erro-tentar-novamente',
  templateUrl: './tentar-novamente.page.html',
  styleUrls: ['./tentar-novamente.component.scss']
})

export class TentarNovamenteComponent implements OnInit {

  @Output() tentarNovamente = new EventEmitter();

  constructor(public router: Router) {
  }

  ngOnInit() {

  }

  action() {
    this.tentarNovamente.emit();
  }
}
