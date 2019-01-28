import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

type TypeInput = 'text' | 'password';

@Component({
  selector: 'ss-title-passos',
  templateUrl: './title-passos.page.html',
  styleUrls: ['./title-passos.component.scss']
})

export class TitlePassosComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() urlBase: string;
  @Input() urlSecundaria: string;

  constructor(public router: Router) {}

  ngOnInit() {}

  voltarPasso() {
    this.router.navigate(['auth', this.urlBase, this.urlSecundaria]);
  }

}
