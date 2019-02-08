import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

type TypeInput = 'text' | 'password';

@Component({
  selector: 'ss-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  @Input() items: any[];

  constructor(public router: Router) {}

  ngOnInit() {
  }

  ir(url) {
    // this.router.navigate(['home', url]);
    console.log(url);
  }
}
