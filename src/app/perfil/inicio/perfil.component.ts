import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import * as moment from 'moment';
import { ModalController, NavController } from '@ionic/angular';
import { EditarComponent } from '../modal/editar.component';

@Component({
  selector: 'perfil-page',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {

  public user: any;

  constructor(
    public router: Router,
    public userService: CurrentUserService,
    public modalController: ModalController,
    public navController: NavController) {}

  ngOnInit() {
    this.user = this.userService.user;
  }

  voltar() {
    this.router.navigate(['home']);
  }

  get formatarDataNascimento() {
    return moment(this.user.dataNascimento).format('DD/MM/YYYY');
  }

  async editar(title, action, label) {
    const modal = await this.modalController.create({
      component: EditarComponent,
      componentProps: { title, action, label }
    });
    await modal.present();
  }

}
