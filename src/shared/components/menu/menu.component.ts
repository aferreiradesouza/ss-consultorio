import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

type TypeInput = 'text' | 'password';

@Component({
  selector: 'ss-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() itens: any[];

  constructor(public router: Router, public navController: NavController) {}

  ngOnInit() {}

  ir(url) {
    this.navController.navigateBack(url, {
      animationDirection: 'forward'
    });
  }
}
