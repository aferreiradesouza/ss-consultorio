import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ContatoService } from '../services/contato.service';
import { UtilContatoService } from '../services/util.service';

@Component({
  selector: 'contato-page',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.component.scss']
})

export class ContatoComponent implements OnInit {

  public user: any;
  public consultorios: any;

  constructor(
    public router: Router,
    public userService: CurrentUserService,
    public storageService: LocalStorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public contatoService: ContatoService,
    public utilService: UtilContatoService) {}

  ngOnInit() {
    this.obterConsultorios();
  }

  voltar() {
    this.navController.navigateBack('home');
  }

  async obterConsultorios() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    const consultas = await this.contatoService.obterConsultorios();

    this.consultorios = this.utilService.formatar(consultas.objeto);
    console.log(this.consultorios);
    await loading.dismiss();
  }
}
