import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import {
  ModalController,
  NavController,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ContatoService } from '../services/contato.service';
import { UtilContatoService } from '../services/util.service';

@Component({
  selector: 'contato-page',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit, AfterViewInit {
  public user: any;
  public consultorios: any;

  constructor(
    public router: Router,
    public userService: CurrentUserService,
    public storageService: LocalStorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public contatoService: ContatoService,
    public utilService: UtilContatoService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.obterConsultorios();
  }

  voltar() {
    this.navController.navigateBack('home');
  }

  async obterConsultorios() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 17000
    });
    await loading.present();
    try {
      const consultas = await this.contatoService.obterConsultorios();
      if (consultas !== undefined) {
        this.consultorios = this.utilService.formatar(consultas.objeto);
      } else {
        const erro = await this.toastController.create({
          message: 'Algo de errado aconteceu, tente novamente mais tarde',
          color: 'dark',
          showCloseButton: true,
          closeButtonText: 'Entendi'
        });
        erro.present();
      }
    } catch (err) {
      const erro = await this.toastController.create({
        message: 'Algo de errado aconteceu, tente novamente mais tarde',
        color: 'dark',
        showCloseButton: true,
        closeButtonText: 'Entendi'
      });
      erro.present();
    } finally {
      await loading.dismiss();
    }
  }
}
