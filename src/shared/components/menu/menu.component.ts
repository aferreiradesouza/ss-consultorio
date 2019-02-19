import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

type TypeInput = 'text' | 'password';

@Component({
  selector: 'ss-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  @Input() itens: any[];

  constructor(public router: Router) {}

  ngOnInit() {
  }

  ir(url) {
    this.router.navigate([url]);
  }
}
