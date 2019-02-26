import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
  @Input() pagina: string;

  constructor(public router: Router, public navController: NavController) {}

  ngOnInit() {}

  voltarPasso() {
  // tslint:disable-next-line: max-line-length
    this.navController.navigateBack(`${this.pagina === 'Registro' || this.pagina === 'Esqueceu senha' ? 'auth/' : ''}${this.urlBase}/${this.urlSecundaria}`);
  }

}
